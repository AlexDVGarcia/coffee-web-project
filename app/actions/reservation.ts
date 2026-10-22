"use server";

import {
  addDays,
  BOOKING_WINDOW_DAYS,
  formatLongDate,
  formatTime,
  MAX_PARTY,
  reservationSlots,
  todayInStore,
  weekdayOf,
} from "@/lib/hours";

export type ReservationField = "nome" | "telefone" | "pessoas" | "data" | "horario";

export type ReservationState = {
  status: "idle" | "success" | "error";
  values: Partial<Record<ReservationField, string>>;
  errors?: Partial<Record<ReservationField, string>>;
  confirmation?: string;
};

/**
 * Valida o pedido de reserva e devolve a confirmação.
 * Decisão de produto: por enquanto a reserva NÃO é salva nem enviada à cafeteria —
 * é só a experiência do cliente. Para valer de verdade, gravar/enviar aqui (banco, e-mail ou WhatsApp).
 */
export async function reserveTable(_prev: ReservationState, formData: FormData): Promise<ReservationState> {
  const read = (field: ReservationField) => String(formData.get(field) ?? "").trim();
  const values = {
    nome: read("nome"),
    telefone: read("telefone"),
    pessoas: read("pessoas"),
    data: read("data"),
    horario: read("horario"),
  };
  const errors: ReservationState["errors"] = {};

  if (values.nome.length < 2) errors.nome = "Informe seu nome para chamarmos você na hora.";
  else if (values.nome.length > 60) errors.nome = "Use no máximo 60 caracteres.";

  const digits = values.telefone.replace(/\D/g, "");
  if (digits.length !== 10 && digits.length !== 11) {
    errors.telefone = "Informe o telefone com DDD, por exemplo (11) 91234-5678.";
  }

  const people = Number(values.pessoas);
  if (!Number.isInteger(people) || people < 1 || people > MAX_PARTY) {
    errors.pessoas = `Escolha de 1 a ${MAX_PARTY} pessoas.`;
  }

  const today = todayInStore(new Date());
  const lastDay = addDays(today, BOOKING_WINDOW_DAYS);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.data)) {
    errors.data = "Escolha a data da reserva.";
  } else if (values.data < today) {
    errors.data = "Escolha uma data a partir de hoje.";
  } else if (values.data > lastDay) {
    errors.data = `Aceitamos reservas para os próximos ${BOOKING_WINDOW_DAYS} dias.`;
  } else if (weekdayOf(values.data) === 1) {
    errors.data = "Às segundas a casa fica fechada. Escolha outro dia.";
  }

  if (!errors.data && !reservationSlots(values.data).includes(values.horario)) {
    errors.horario = "Escolha um horário dentro do funcionamento desse dia.";
  }

  if (Object.keys(errors).length > 0) return { status: "error", values, errors };

  const firstName = values.nome.split(/\s+/)[0];
  return {
    status: "success",
    values,
    confirmation: `Mesa reservada para ${people} ${people === 1 ? "pessoa" : "pessoas"} em ${formatLongDate(values.data)}, às ${formatTime(values.horario)}. Até lá, ${firstName}!`,
  };
}
