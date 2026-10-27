"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ASSISTANT_ENDPOINT, MAX_MESSAGES, MAX_QUESTION_LENGTH, type AssistantMessage } from "@/lib/assistant";
import { Button } from "./Button";
import { cx } from "./cx";
import { Panel } from "./Panel";
import { TextField } from "./TextField";

const suggestions = ["O que é sem lactose?", "Qual combina com um croissant?", "O que tem de gelado?"];

const FAILED = "Não consegui responder agora. Tente de novo ou pergunte no balcão.";

/**
 * Chat sobre o cardápio. A resposta chega em texto puro, em pedaços, de /api/assistente
 * e vai sendo escrita na última mensagem enquanto o Claude responde.
 */
export function MenuAssistant() {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [pending, setPending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function ask(text: string) {
    const content = text.trim();
    if (!content || pending) return;

    // Mantém só o fim da conversa, dentro do limite que o servidor aceita.
    const history = [...messages, { role: "user" as const, content }].slice(-(MAX_MESSAGES - 1));
    const start = history.findIndex((message) => message.role === "user");
    const sent = history.slice(start);

    setMessages([...sent, { role: "assistant", content: "" }]);
    setQuestion("");
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const write = (answer: string) =>
      setMessages((current) => [...current.slice(0, -1), { role: "assistant", content: answer }]);

    try {
      const response = await fetch(ASSISTANT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: sent }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        write(data?.error ?? FAILED);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        write(answer);
      }
      if (!answer.trim()) write(FAILED);
    } catch {
      if (!controller.signal.aborted) write(FAILED);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }

  return (
    <Panel tone="crema" data-theme="paper" aria-labelledby="assistente-titulo" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 id="assistente-titulo" className="text-h3 font-medium">
          Pergunte sobre o cardápio
        </h2>
        <p className="measure">
          Dúvida sobre um item ou sobre o que pedir junto? Pergunte aqui. Alergias, confirme sempre no balcão.
        </p>
      </div>

      {messages.length === 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="Sugestões de pergunta">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  // As sugestões somem depois do clique; o foco vai para o campo em vez de cair no <body>.
                  inputRef.current?.focus();
                  ask(suggestion);
                }}
              >
                {suggestion}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div role="log" aria-live="polite" aria-busy={pending}>
          <ol className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <li
                key={index}
                className={message.role === "assistant" ? "rounded-card bg-surface p-4" : "border-l-2 border-rule pl-4"}
              >
                {/* Sobre o crema só texto ink; o ink-muted (cacao) fica no bloco paper da resposta. */}
                <p className={cx("text-caption font-medium", message.role === "assistant" && "text-ink-muted")}>
                  {message.role === "user" ? "Você" : "ADVG Coffee"}
                </p>
                <p className="measure mt-1 whitespace-pre-line">
                  {message.content || <span className="text-ink-muted">Escrevendo…</span>}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <TextField
          ref={inputRef}
          label="Sua pergunta"
          name="pergunta"
          autoComplete="off"
          maxLength={MAX_QUESTION_LENGTH}
          placeholder="Ex.: qual doce vai bem com um expresso?"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="flex-1"
        />
        <Button type="submit" loading={pending} loadingLabel="Respondendo…" disabled={!question.trim()}>
          Perguntar
        </Button>
      </form>
    </Panel>
  );
}
