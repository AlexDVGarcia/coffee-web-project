"use client";

import { createContext, use, useActionState, useRef, useState, type ReactNode } from "react";
import { reserveTable, type ReservationState } from "@/app/actions/reservation";
import { addDays, BOOKING_WINDOW_DAYS, formatTime, MAX_PARTY, reservationSlots, todayInStore } from "@/lib/hours";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";
import { CupMark } from "./CupMark";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";

type DateLimits = { min: string; max: string };

const ReservationContext = createContext<{ open: () => void } | null>(null);

/**
 * Um único <dialog> de reserva para o site todo. Qualquer ReserveButton abre o mesmo diálogo;
 * <dialog>.showModal() prende o foco, fecha com Esc e devolve o foco ao botão que o abriu.
 */
export function ReservationProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState<{ key: number; limits: DateLimits } | null>(null);

  function open() {
    const today = todayInStore(new Date());
    setSession((current) => ({
      key: (current?.key ?? 0) + 1,
      limits: { min: today, max: addDays(today, BOOKING_WINDOW_DAYS) },
    }));
    dialogRef.current?.showModal();
  }

  const close = () => dialogRef.current?.close();

  return (
    <ReservationContext value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="reserva-titulo"
        className="m-auto w-[min(100%-2rem,32rem)] rounded-panel bg-surface p-panel text-ink shadow-overlay backdrop:bg-espresso/60"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="reserva-titulo" className="text-h3 font-medium">
            Reservar uma mesa
          </h2>
          <Button variant="quiet" onClick={close}>
            Fechar
          </Button>
        </div>
        {session && <ReservationForm key={session.key} limits={session.limits} onDone={close} />}
      </dialog>
    </ReservationContext>
  );
}

export function ReserveButton({
  variant = "primary",
  size = "md",
  className,
  children = "Reservar uma mesa",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}) {
  const context = use(ReservationContext);
  if (!context) throw new Error("ReserveButton precisa estar dentro de ReservationProvider");
  return (
    <Button variant={variant} size={size} className={className} onClick={context.open} aria-haspopup="dialog">
      {children}
    </Button>
  );
}

const initialState: ReservationState = { status: "idle", values: {} };

const partyOptions = Array.from({ length: MAX_PARTY }, (_, i) => ({
  value: String(i + 1),
  label: i === 0 ? "1 pessoa" : `${i + 1} pessoas`,
}));

function ReservationForm({ limits, onDone }: { limits: DateLimits; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(reserveTable, initialState);
  const [date, setDate] = useState(state.values.data ?? "");
  const slots = date ? reservationSlots(date) : [];

  if (state.status === "success") {
    return (
      <div role="status" className="mt-6 flex flex-col items-start gap-6">
        <CupMark size={40} className="text-ink-muted" />
        <p className="text-lead">{state.confirmation}</p>
        <p className="text-small text-ink-muted">
          Se precisar mudar algo, é só falar com a gente no balcão.
        </p>
        <Button onClick={onDone}>Fechar</Button>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="mt-6 grid gap-6 sm:grid-cols-2">
      <TextField
        label="Nome"
        name="nome"
        autoComplete="name"
        autoFocus
        required
        defaultValue={state.values.nome}
        error={state.errors?.nome}
        className="sm:col-span-2"
      />
      <TextField
        label="Telefone ou WhatsApp"
        name="telefone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="(11) 91234-5678"
        required
        defaultValue={state.values.telefone}
        error={state.errors?.telefone}
        className="sm:col-span-2"
      />
      <SelectField
        label="Número de pessoas"
        name="pessoas"
        options={partyOptions}
        defaultValue={state.values.pessoas ?? "2"}
        error={state.errors?.pessoas}
        hint="Grupos maiores: fale com a gente no balcão."
        className="sm:col-span-2"
      />
      <TextField
        label="Data"
        name="data"
        type="date"
        min={limits.min}
        max={limits.max}
        required
        value={date}
        onChange={(event) => setDate(event.target.value)}
        error={state.errors?.data}
      />
      <SelectField
        key={date}
        label="Horário"
        name="horario"
        options={slots.map((slot) => ({ value: slot, label: formatTime(slot) }))}
        placeholder={!date ? "Escolha a data antes" : slots.length ? "Escolha" : "Fechado neste dia"}
        defaultValue={slots.includes(state.values.horario ?? "") ? state.values.horario : ""}
        disabled={slots.length === 0}
        required
        error={state.errors?.horario}
      />
      <Button type="submit" size="lg" loading={pending} loadingLabel="Reservando…" className="w-full sm:col-span-2">
        Reservar mesa
      </Button>
    </form>
  );
}
