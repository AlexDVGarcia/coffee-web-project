/** Contrato entre o chat do cardápio (cliente) e /api/assistente (servidor). */

export type AssistantMessage = { role: "user" | "assistant"; content: string };

export const ASSISTANT_ENDPOINT = "/api/assistente";
export const MAX_QUESTION_LENGTH = 300;
export const MAX_MESSAGES = 20;
