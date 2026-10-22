/** Junta classes condicionais. Evita dependência extra (clsx) para um caso trivial. */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
