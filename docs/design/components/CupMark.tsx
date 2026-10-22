import { cx } from "./cx";

type CupMarkProps = {
  /** Lado em px. Mínimo legível: 16. */
  size?: number;
  /** Texto acessível. Omita quando a marca estiver ao lado do nome escrito. */
  title?: string;
  className?: string;
};

/**
 * Símbolo da xícara: tigela com fenda vertical sobre um pires reto.
 * Herda a cor do texto (currentColor) — nunca recebe cor própria.
 */
export function CupMark({ size = 32, title, className }: CupMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cx("shrink-0", className)}
      fill="currentColor"
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        d="M5 7h38v9c0 11.6-8.5 19-19 19S5 27.6 5 16V7Zm17 6a2 2 0 0 1 4 0v12a2 2 0 0 1-4 0V13Z"
      />
      <rect x="7" y="38" width="34" height="5" />
    </svg>
  );
}
