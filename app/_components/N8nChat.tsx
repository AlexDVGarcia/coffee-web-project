"use client";

import "@n8n/chat/style.css";
import { useEffect, useRef } from "react";

/**
 * Chat flutuante do agente do N8N. O pacote é um app Vue que mexe em window e localStorage,
 * por isso é carregado só no navegador, montado num div próprio e desmontado ao sair.
 * As mensagens passam por /api/chat, que repassa ao webhook do N8N.
 */
export function N8nChat() {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let app: { unmount: () => void } | undefined;

    import("@n8n/chat").then(({ createChat }) => {
      if (cancelled || !targetRef.current) return;
      app = createChat({
        webhookUrl: "/api/chat",
        target: targetRef.current,
        mode: "window",
        showWelcomeScreen: false,
        initialMessages: ["Oi! Sou o atendente da ADVG Coffee.", "Posso ajudar com o cardápio, os horários e os eventos."],
        i18n: {
          en: {
            title: "ADVG Coffee",
            subtitle: "Pergunte o que quiser sobre a casa.",
            footer: "",
            getStarted: "Começar conversa",
            inputPlaceholder: "Escreva sua pergunta…",
            closeButtonTooltip: "Fechar",
          },
        },
      });
    });

    return () => {
      cancelled = true;
      app?.unmount();
    };
  }, []);

  return <div ref={targetRef} className="n8n-chat" />;
}
