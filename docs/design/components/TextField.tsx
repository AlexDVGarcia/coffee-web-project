import { useId, type ComponentPropsWithRef } from "react";
import { cx } from "./cx";

type TextFieldProps = ComponentPropsWithRef<"input"> & {
  label: string;
  /** Orientação curta abaixo do campo. Substituída pela mensagem de erro quando houver. */
  hint?: string;
  error?: string;
};

export function TextField({ label, hint, error, id, className, ...props }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;

  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      <label htmlFor={inputId} className="text-small font-medium text-ink">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cx(
          "h-11 rounded-control border-[1.5px] bg-surface px-3.5 text-body text-ink",
          "placeholder:text-ink-muted transition-colors duration-(--duration-fast)",
          "focus-visible:outline-offset-0 disabled:opacity-45",
          error ? "border-danger" : "border-rule hover:border-ink",
        )}
        {...props}
      />
      {message && (
        <p id={messageId} className={cx("text-small", error ? "text-danger" : "text-ink-muted")}>
          {message}
        </p>
      )}
    </div>
  );
}
