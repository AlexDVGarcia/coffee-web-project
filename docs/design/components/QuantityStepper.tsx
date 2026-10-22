"use client";

import { useState } from "react";
import { cx } from "./cx";

type QuantityStepperProps = {
  /** Nome do item, usado nos rótulos acessíveis ("Remover um Flat white"). */
  itemName: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
};

const stepButton =
  "grid size-9 place-items-center rounded-control text-lead leading-none text-ink " +
  "hover:bg-rule-soft disabled:opacity-35 disabled:hover:bg-transparent";

export function QuantityStepper({
  itemName,
  defaultValue = 1,
  min = 0,
  max = 20,
  onChange,
  className,
}: QuantityStepperProps) {
  const [value, setValue] = useState(defaultValue);

  function update(next: number) {
    const clamped = Math.min(max, Math.max(min, next));
    setValue(clamped);
    onChange?.(clamped);
  }

  return (
    <div
      role="group"
      aria-label={`Quantidade de ${itemName}`}
      className={cx(
        "inline-flex items-center gap-1 rounded-control border-[1.5px] border-rule p-0.5",
        className,
      )}
    >
      <button
        type="button"
        className={stepButton}
        onClick={() => update(value - 1)}
        disabled={value <= min}
        aria-label={`Remover um ${itemName}`}
      >
        −
      </button>
      <output aria-live="polite" className="min-w-6 text-center text-body font-medium tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={stepButton}
        onClick={() => update(value + 1)}
        disabled={value >= max}
        aria-label={`Adicionar um ${itemName}`}
      >
        +
      </button>
    </div>
  );
}
