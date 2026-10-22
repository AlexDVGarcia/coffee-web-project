import { cacheLife } from "next/cache";
import { addDays, formatLongDate, todayInStore, weekdayOf } from "./hours";
import { siteImages, type SiteImage } from "./images";

export type CafeEvent = {
  id: "microfone-aberto" | "degustacao";
  name: string;
  description: string;
  schedule: string;
  note: string;
  image: SiteImage;
  dates: { iso: string; label: string }[];
};

/** Próximas `count` datas (incluindo hoje) que caem no dia da semana indicado. */
function nextWeekdays(from: string, weekday: number, count: number) {
  const offset = (weekday - weekdayOf(from) + 7) % 7;
  return Array.from({ length: count }, (_, i) => addDays(from, offset + i * 7));
}

/**
 * Os eventos são fixos na semana; só as datas mudam. Cacheado por algumas horas
 * porque depende do relógio (exigência do cacheComponents).
 */
export async function getUpcomingEvents(): Promise<CafeEvent[]> {
  "use cache";
  cacheLife("hours");

  const today = todayInStore(new Date());
  const withLabels = (dates: string[]) => dates.map((iso) => ({ iso, label: formatLongDate(iso) }));

  return [
    {
      id: "microfone-aberto",
      name: "Microfone aberto",
      description:
        "Voz, violão, poesia ou aquela música que você só canta no chuveiro. O palco é pequeno e a plateia é a vizinhança.",
      schedule: "Sextas, das 19h às 22h",
      note: "Quer se apresentar? Chegue às 18h30 e deixe seu nome na lista. Cada um tem até 3 músicas.",
      image: siteImages.openMic,
      dates: withLabels(nextWeekdays(today, 5, 3)),
    },
    {
      id: "degustacao",
      name: "Degustação de cafés",
      description:
        "Três cafés de pequenos produtores, provados lado a lado. O Alex conta de onde vem cada um e o que procurar na xícara.",
      schedule: "Sábados, das 9h às 10h30",
      note: "São 12 lugares por sessão. Reserve sua mesa e avise no balcão que veio para a degustação.",
      image: siteImages.tasting,
      dates: withLabels(nextWeekdays(today, 6, 3)),
    },
  ];
}
