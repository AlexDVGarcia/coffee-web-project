import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "./cx";

export type PanelTone = "espresso" | "oxblood" | "olive" | "rose" | "crema" | "paper";

/** Cada tom já traz sua cor de texto aprovada em contraste (≥ 5.7:1). */
const tones: Record<PanelTone, string> = {
  espresso: "bg-espresso text-crema",
  oxblood: "bg-oxblood text-crema",
  olive: "bg-olive text-paper",
  rose: "bg-rose text-espresso",
  crema: "bg-crema text-espresso",
  paper: "bg-paper text-espresso",
};

type PanelProps<T extends ElementType> = {
  as?: T;
  tone?: PanelTone;
  /** "flush" remove o padding para fotos que sangram até a borda. */
  padding?: "panel" | "flush";
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * Bloco de cor do bento — a unidade estrutural da marca (referência 1).
 * Separa conteúdo por cor, não por sombra ou borda.
 */
export function Panel<T extends ElementType = "section">({
  as,
  tone = "espresso",
  padding = "panel",
  className,
  ...props
}: PanelProps<T>) {
  const Component: ElementType = as ?? "section";
  return (
    <Component
      className={cx(
        "relative overflow-hidden rounded-panel",
        tones[tone],
        padding === "panel" && "p-panel",
        className,
      )}
      {...props}
    />
  );
}
