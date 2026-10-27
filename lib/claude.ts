import Anthropic from "@anthropic-ai/sdk";

/**
 * Cliente da API do Claude, usado só no servidor (Route Handler do assistente e action de reserva).
 * A chave vem de ANTHROPIC_API_KEY em .env.local. Sem ela, o assistente responde 503 e a reserva
 * usa a confirmação padrão — o site continua funcionando.
 */
export const CLAUDE_MODEL = "claude-opus-5-5";

export const claudeEnabled = Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);

/**
 * Se o Claude recusar por política de segurança, a API refaz o pedido em outro modelo na mesma chamada.
 * Exige a rota beta (client.beta.messages).
 */
export const claudeFallback: Pick<Anthropic.Beta.MessageCreateParams, "betas" | "fallbacks"> = {
  betas: ["server-side-fallback-2026-07-01"],
  fallbacks: "default",
};

let client: Anthropic | undefined;

export function claude() {
  client ??= new Anthropic();
  return client;
}
