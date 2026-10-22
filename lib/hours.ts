/** Horário de funcionamento. Funções puras: usadas no rodapé, no formulário (cliente) e na validação (servidor). */

export const TIME_ZONE = "America/Sao_Paulo";

/** Regras de reserva compartilhadas entre o formulário e a validação no servidor. */
export const MAX_PARTY = 10;
export const BOOKING_WINDOW_DAYS = 60;

type Opening = { open: string; close: string };

/** Índice = dia da semana (0 = domingo). null = fechado. */
export const weeklyHours: (Opening | null)[] = [
  { open: "08:00", close: "14:00" },
  null,
  { open: "07:00", close: "19:00" },
  { open: "07:00", close: "19:00" },
  { open: "07:00", close: "19:00" },
  { open: "07:00", close: "22:00" },
  { open: "08:00", close: "18:00" },
];

/** Linhas agrupadas para exibição: "Terça a quinta · 7h às 19h". */
export const hoursSummary = [
  { days: "Terça a quinta", hours: "7h às 19h" },
  { days: "Sexta", hours: "7h às 22h" },
  { days: "Sábado", hours: "8h às 18h" },
  { days: "Domingo", hours: "8h às 14h" },
  { days: "Segunda", hours: "Fechado" },
];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const toHHMM = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** Dia da semana de uma data ISO (AAAA-MM-DD), sem depender do fuso de quem executa. */
export function weekdayOf(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** Horários de reserva de meia em meia hora; a última mesa sai 1h antes de fechar. */
export function reservationSlots(isoDate: string) {
  const opening = weeklyHours[weekdayOf(isoDate)];
  if (!opening) return [];
  const slots: string[] = [];
  for (let t = toMinutes(opening.open); t <= toMinutes(opening.close) - 60; t += 30) slots.push(toHHMM(t));
  return slots;
}

/** Data de hoje (AAAA-MM-DD) no fuso da cafeteria. */
export function todayInStore(now: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now);
}

export function addDays(isoDate: string, days: number) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

/** "10:00" → "10h", "10:30" → "10h30". */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
}

export function formatLongDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
