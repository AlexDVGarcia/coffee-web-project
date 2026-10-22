import { useId, type ComponentPropsWithRef } from "react";
import { cx } from "./cx";

type SelectFieldProps = ComponentPropsWithRef<"select"> & {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

/** Mesmo visual e comportamento acessível do TextField, para listas fechadas. */
export function SelectField({ label, hint, error, options, placeholder, id, className, ...props }: SelectFieldProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const messageId = `${selectId}-message`;
  const message = error ?? hint;

  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      <label htmlFor={selectId} className="text-small font-medium text-ink">
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cx(
          "h-11 rounded-control border-[1.5px] bg-surface px-3 text-body text-ink",
          "transition-colors duration-(--duration-fast) focus-visible:outline-offset-0 disabled:opacity-45",
          error ? "border-danger" : "border-rule hover:border-ink",
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {message && (
        <p id={messageId} className={cx("text-small", error ? "text-danger" : "text-ink-muted")}>
          {message}
        </p>
      )}
    </div>
  );
}
