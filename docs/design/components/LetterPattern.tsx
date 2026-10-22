import { cx } from "./cx";

/** Posições fixas (não aleatórias) para que o render do servidor e do cliente coincidam. */
const placements = [
  { top: "-18%", left: "-6%", rotate: -24 },
  { top: "-10%", left: "58%", rotate: 32 },
  { top: "38%", left: "-12%", rotate: 12 },
  { top: "46%", left: "44%", rotate: -38 },
  { top: "70%", left: "78%", rotate: 20 },
];

type LetterPatternProps = {
  /** Letras do nome da marca, uma por posição. */
  letters: string;
  className?: string;
};

/**
 * Letras gigantes, cortadas e giradas, quase da cor do fundo (referência 3).
 * Decoração pura: fica atrás do conteúdo, nunca atrás de texto corrido.
 * O pai precisa de `relative overflow-hidden` e de uma cor de texto que defina o tom das letras
 * (ex.: text-roast sobre bg-espresso, text-moss sobre bg-olive).
 */
export function LetterPattern({ letters, className }: LetterPatternProps) {
  return (
    <div aria-hidden className={cx("pointer-events-none absolute inset-0 select-none", className)}>
      {letters
        .slice(0, placements.length)
        .split("")
        .map((letter, i) => (
          <span
            key={i}
            className="absolute font-display text-[clamp(14rem,40vw,34rem)] leading-none"
            style={{
              top: placements[i].top,
              left: placements[i].left,
              transform: `rotate(${placements[i].rotate}deg)`,
            }}
          >
            {letter}
          </span>
        ))}
    </div>
  );
}
