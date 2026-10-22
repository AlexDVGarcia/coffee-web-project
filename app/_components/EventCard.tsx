import Image from "next/image";
import type { CafeEvent } from "@/lib/events";
import { Panel, type PanelTone } from "./Panel";
import { cx } from "./cx";

/** Evento fixo da semana: bloco de cor com foto sangrada, descrição e as próximas datas. */
export function EventCard({ event, tone, className }: { event: CafeEvent; tone: PanelTone; className?: string }) {
  return (
    <Panel as="article" tone={tone} padding="flush" className={cx("grid md:grid-cols-2", className)}>
      <div className="relative aspect-4/3 md:aspect-auto md:min-h-full">
        <Image src={event.image.src} alt={event.image.alt} fill sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col gap-4 p-panel">
        <div>
          <h3 className="text-h3 font-medium">{event.name}</h3>
          <p className="mt-1 font-medium">{event.schedule}</p>
        </div>
        <p>{event.description}</p>
        <div className="mt-auto">
          <h4 className="text-small font-medium">Próximas datas</h4>
          <ul className="mt-1">
            {event.dates.map((date) => (
              <li key={date.iso} className="border-b border-current/30 py-1.5 first-letter:uppercase">
                <time dateTime={date.iso}>{date.label}</time>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-small opacity-90">{event.note}</p>
        </div>
      </div>
    </Panel>
  );
}
