import Image from "next/image";
import Link from "next/link";
import { getUpcomingEvents } from "@/lib/events";
import { hoursSummary } from "@/lib/hours";
import { siteImages } from "@/lib/images";
import { getPopular } from "@/lib/menu";
import { buttonClasses } from "./_components/Button";
import { EventCard } from "./_components/EventCard";
import { MenuItemCard } from "./_components/MenuItemCard";
import { Panel } from "./_components/Panel";
import { ReserveButton } from "./_components/Reservation";
import { TaglineStair } from "./_components/TaglineStair";

export default async function Home() {
  const popular = getPopular();
  const [openMic, tasting] = await getUpcomingEvents();

  return (
    <>
      <section data-theme="roast" className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden text-ink">
        <Image
          src={siteImages.hero.src}
          alt={siteImages.hero.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(30_20_16/0.85),rgb(30_20_16/0.55)_50%,rgb(30_20_16/0.15)_85%)]"
        />
        <div className="mx-auto w-full max-w-page px-gutter pb-16 pt-24 md:pb-24">
          <TaglineStair
            as="h1"
            size="h1"
            animate
            className="max-w-4xl"
            lines={[
              { text: "Café especial", column: 1 },
              { text: "no Centro", column: 1, align: "end" },
              { text: "de Itapecerica", column: 2 },
              { text: "da Serra", column: 2, align: "end" },
            ]}
          />
          <p className="measure mt-8 text-lead">
            Grãos de pequenos produtores, doces que saem do forno toda manhã e lanches leves. Uma cafeteria de bairro,
            com mesa esperando por você.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ReserveButton size="lg" />
            <Link href="/cardapio" className={buttonClasses({ variant: "secondary", size: "lg" })}>
              Ver cardápio
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="populares" className="mx-auto max-w-page px-gutter pt-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="populares" className="text-h2 font-medium">Os mais pedidos</h2>
            <p className="measure mt-2 text-ink-muted">O que a vizinhança pede de novo e de novo.</p>
          </div>
          <Link href="/cardapio" className={buttonClasses({ variant: "quiet" })}>
            Ver o cardápio completo
          </Link>
        </div>
        <div className="mt-12 grid gap-bento sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((item) => (
            <MenuItemCard key={item.slug} item={item} variant="feature" showCategory />
          ))}
        </div>
      </section>

      <section aria-labelledby="eventos" className="mx-auto max-w-page px-gutter pt-section">
        <h2 id="eventos" className="text-h2 font-medium">Próximos eventos</h2>
        <p className="measure mt-2 text-ink-muted">Toda semana, dois encontros que viraram tradição na casa.</p>
        <div className="mt-12 grid gap-bento lg:grid-cols-[1fr_1fr]">
          <EventCard event={openMic} tone="olive" />
          <EventCard event={tasting} tone="oxblood" />
        </div>
        <Panel tone="rose" className="mt-bento flex flex-wrap items-center justify-between gap-4">
          <p className="tagline text-h4">Quer tocar na sexta?</p>
          <p className="measure">Música, poesia ou stand-up: chegue às 18h30 e coloque seu nome na lista.</p>
        </Panel>
      </section>

      <section aria-labelledby="visite" className="mx-auto max-w-page px-gutter pt-section">
        <Panel tone="crema" data-theme="paper" className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <h2 id="visite" className="text-h2 font-medium">Venha nos visitar</h2>
            <p className="measure text-lead">
              Estamos no Centro de Itapecerica da Serra. Venha para o café da manhã, para uma pausa à tarde ou para
              encontrar os amigos na sexta à noite.
            </p>
            <ReserveButton />
          </div>
          <dl>
            {hoursSummary.map((row) => (
              <div key={row.days} className="flex justify-between gap-4 border-b border-rule py-3">
                <dt>{row.days}</dt>
                <dd className="font-medium tabular-nums">{row.hours}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </section>
    </>
  );
}
