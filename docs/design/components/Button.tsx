import type { ComponentPropsWithRef } from "react";
import { cx } from "./cx";

export type ButtonVariant = "primary" | "secondary" | "accent" | "quiet";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap select-none " +
  "transition-[background-color,color,border-color,transform] duration-(--duration-base) ease-snap " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-45 aria-busy:cursor-progress";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-action text-action-ink hover:bg-action-hover",
  secondary: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-surface",
  accent: "bg-olive text-paper hover:bg-moss",
  quiet: "text-ink underline decoration-1 underline-offset-4 hover:decoration-2 px-0!",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-small",
  md: "h-11 px-5 text-body",
  lg: "h-13 px-7 text-lead",
};

/** Use em <Link className={buttonClasses()}> quando a ação for navegação. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cx(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Mantém a largura e troca o rótulo; o botão fica inerte enquanto carrega. */
  loading?: boolean;
  loadingLabel?: string;
};

export function Button({
  variant,
  size,
  loading = false,
  loadingLabel,
  className,
  children,
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  );
}
