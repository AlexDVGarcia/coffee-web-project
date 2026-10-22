import type { ReactNode } from "react";
import { cx } from "./cx";

type TagTone = "neutral" | "olive" | "rose";

const tones: Record<TagTone, string> = {
  neutral: "border border-rule-soft text-ink",
  olive: "bg-olive text-paper",
  rose: "bg-rose text-espresso",
};

/** Etiqueta informativa (notas sensoriais, torra, "Novo"). Não é clicável — para filtros use FilterChip. */
export function Tag({ tone = "neutral", children }: { tone?: TagTone; children: ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex h-6 items-center rounded-full px-2.5 text-caption font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
