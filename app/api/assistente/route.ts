import type Anthropic from "@anthropic-ai/sdk";
import { MAX_MESSAGES, MAX_QUESTION_LENGTH, type AssistantMessage } from "@/lib/assistant";
import { claude, claudeEnabled, claudeFallback, CLAUDE_MODEL } from "@/lib/claude";
import { getUpcomingEvents } from "@/lib/events";
import { hoursSummary } from "@/lib/hours";
import { categoryIntros, formatPrice, getCategories } from "@/lib/menu";

const UNAVAILABLE = "O assistente está fora do ar agora. Pergunte no balcão, a gente responde com prazer.";

/** Cardápio, horários e eventos. Sem datas nem horário atual, para o prefixo ficar estável no cache. */
async function systemPrompt() {
  const menu = getCategories()
    .map((category) => {
      const items = category.items
        .map((item) => {
          const badge = item.badge ? ` [${item.badge}]` : "";
          return `- ${item.name} (${formatPrice(item.priceInCents)})${badge}: ${item.description}`;
        })
        .join("\n");
      return `## ${category.name}\n${categoryIntros[category.name] ?? ""}\n${items}`;
    })
    .join("\n\n");
  const hours = hoursSummary.map((line) => `- ${line.days}: ${line.hours}`).join("\n");
  const events = (await getUpcomingEvents())
    .map((event) => `- ${event.name} (${event.schedule}): ${event.description} ${event.note}`)
    .join("\n");

  return `Você atende os clientes da ADVG Coffee Co, uma cafeteria de bairro no Centro de Itapecerica da Serra, pelo chat da página do cardápio. As pessoas perguntam o que pedir, o que combina com o quê, o que tem em cada item e quanto custa.

Responda só com base nas informações abaixo. As descrições do cardápio não listam todos os ingredientes, então quando a pergunta for sobre lactose, glúten, alergias ou algo que a descrição não diz, fale o que o cardápio informa (por exemplo, que as bebidas de expresso podem ser feitas com leite vegetal sem custo extra) e recomende confirmar no balcão. Nunca garanta que um item é seguro para quem tem alergia. Se alguém perguntar algo sem relação com a cafeteria, responda em uma frase que você só ajuda com o cardápio, os horários e os eventos.

Escreva como a marca fala: pouco e com calma, em português do Brasil, tratando a pessoa por "você". Responda em duas a quatro frases, citando os itens pelo nome e com o preço quando ajudar. A resposta aparece como texto simples, então não use markdown, asteriscos nem títulos.

# Cardápio (preços em reais)

${menu}

# Horário de funcionamento

${hours}

# Eventos semanais

${events}`;
}

/** Aceita só o formato que o chat envia, com limites para não virar um proxy aberto da API. */
function parseMessages(body: unknown): AssistantMessage[] | null {
  if (typeof body !== "object" || body === null || !("messages" in body)) return null;
  const { messages } = body as { messages: unknown };
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return null;

  const parsed: AssistantMessage[] = [];
  for (const message of messages) {
    if (typeof message !== "object" || message === null) return null;
    const { role, content } = message as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || (role === "user" && text.length > MAX_QUESTION_LENGTH)) return null;
    parsed.push({ role, content: text });
  }
  return parsed[0].role === "user" && parsed.at(-1)?.role === "user" ? parsed : null;
}

export async function POST(request: Request) {
  if (!claudeEnabled) return Response.json({ error: UNAVAILABLE }, { status: 503 });

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) return Response.json({ error: `Escreva uma pergunta de até ${MAX_QUESTION_LENGTH} caracteres.` }, { status: 400 });

  const stream = claude().beta.messages.stream({
    ...claudeFallback,
    model: CLAUDE_MODEL,
    max_tokens: 16000,
    // Perguntas curtas de cardápio não precisam de raciocínio longo; low deixa a resposta mais rápida.
    output_config: { effort: "low" },
    cache_control: { type: "ephemeral" },
    system: await systemPrompt(),
    messages: messages satisfies Anthropic.Beta.BetaMessageParam[],
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wroteText = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
            wroteText = true;
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("Não consigo ajudar com isso por aqui. Pergunte no balcão."));
        }
      } catch (error) {
        console.error("[assistente]", error);
        controller.enqueue(encoder.encode(wroteText ? `\n\n${UNAVAILABLE}` : UNAVAILABLE));
      }
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
