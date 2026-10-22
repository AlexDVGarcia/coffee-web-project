import { cx } from "./cx";

export type StairLine = {
  text: string;
  /** Coluna da grade de 2 colunas onde a linha vive. */
  column: 1 | 2;
  /** Alinhamento dentro da coluna; alternar start/end cria o degrau. */
  align?: "start" | "end";
};

type TaglineStairProps = {
  lines: StairLine[];
  as?: "h1" | "h2" | "p";
  size?: "h3" | "h2" | "h1";
  /** Desenha os filetes em sequência no carregamento. Use uma vez por página. */
  animate?: boolean;
  className?: string;
};

const sizes = { h3: "text-h3", h2: "text-h2", h1: "text-h1" };

/**
 * Elemento-assinatura: tagline em caixa-alta que desce em degraus pela grade,
 * cada linha apoiada num filete (referências 1, 2 e 3).
 *
 * Leitores de tela recebem a frase inteira; os degraus são só visuais.
 * Abaixo de `sm` as linhas empilham numa coluna só (o degrau fica no alinhamento start/end),
 * para que pedaços longos não estourem a meia coluna no celular.
 */
export function TaglineStair({
  lines,
  as: Tag = "h2",
  size = "h2",
  animate = false,
  className,
}: TaglineStairProps) {
  const sentence = lines.map((line) => line.text).join(" ");

  return (
    <Tag className={cx("tagline grid gap-x-6 sm:grid-cols-2", sizes[size], className)}>
      <span className="sr-only">{sentence}</span>
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden
          className={cx(
            "relative block pb-1.5 pt-2",
            line.column === 1 ? "sm:col-start-1" : "sm:col-start-2",
            line.align === "end" ? "text-end" : "text-start",
          )}
        >
          {line.text}
          <span
            className={cx(
              "absolute inset-x-0 bottom-0 h-px bg-current",
              line.align === "end" ? "origin-right" : "origin-left",
              animate && "motion-safe:animate-rule-draw",
            )}
            style={animate ? { animationDelay: `${i * 140}ms` } : undefined}
          />
        </span>
      ))}
    </Tag>
  );
}
