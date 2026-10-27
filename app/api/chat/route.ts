const MAX_BODY_LENGTH = 8_000;

const UNAVAILABLE = "O atendimento está fora do ar agora. Pergunte no balcão, a gente responde com prazer.";

/**
 * Repasse do widget do N8N para o webhook do Chat Trigger. O webhook é HTTP num IP,
 * então o navegador não pode chamá-lo direto de uma página HTTPS (mixed content) nem
 * ver o endereço; o servidor faz a chamada e devolve a resposta como veio, inclusive em streaming.
 */
export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!webhookUrl) return Response.json({ output: UNAVAILABLE }, { status: 503 });

  const body = await request.text();
  if (!body || body.length > MAX_BODY_LENGTH) return Response.json({ output: UNAVAILABLE }, { status: 400 });

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": request.headers.get("content-type") ?? "application/json" },
      body,
      signal: AbortSignal.timeout(60_000),
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    return Response.json({ output: UNAVAILABLE }, { status: 502 });
  }
}
