import type { Metadata } from "next";
import { menuImages, siteImages, type SiteImage } from "@/lib/images";
import { getCategories } from "@/lib/menu";
import { MenuItemCard } from "../_components/MenuItemCard";

export const metadata: Metadata = {
  title: "Cardápio",
  description: "Bebidas de expresso, bebidas geladas, doces e sanduíches da ADVG Coffee Co, com preços.",
};

const intros: Record<string, string> = {
  "Bebidas de expresso": "Nosso blend da casa, torrado em pequenos lotes. Leite vegetal sem custo extra.",
  "Bebidas geladas": "Para as tardes quentes da Serra. Cold brew extraído a frio por 18 horas.",
  Doces: "Feitos todas as manhãs pela Kátia. Quando acaba, acabou.",
  Sanduíches: "Lanches leves, montados na hora com pães de fermentação natural e da chapa.",
};

function Credit({ image, label }: { image: SiteImage; label: string }) {
  const { credit } = image;
  return (
    <li>
      {label}:{" "}
      {credit.source === "Pexels" ? (
        <a href={credit.page} className="underline decoration-1 underline-offset-2">Pexels</a>
      ) : (
        <>
          <a href={credit.page} className="underline decoration-1 underline-offset-2">{credit.author}</a>, Wikimedia
          Commons, <a href={credit.licenseUrl} className="underline decoration-1 underline-offset-2">{credit.license}</a>
        </>
      )}
    </li>
  );
}

export default function MenuPage() {
  const categories = getCategories();
  const itemCredits = categories.flatMap((category) => category.items.map((item) => ({ label: item.name, image: menuImages[item.slug] })));
  const siteCredits = [
    { label: "Interior da cafeteria", image: siteImages.hero },
    { label: "Barista", image: siteImages.barista },
    { label: "Fundadores", image: siteImages.founders },
    { label: "Vitrine de doces", image: siteImages.pastries },
    { label: "Microfone aberto", image: siteImages.openMic },
    { label: "Degustação", image: siteImages.tasting },
  ];

  return (
    <>
      <header className="mx-auto max-w-page px-gutter pt-section">
        <h1 className="tagline text-h1">Cardápio</h1>
        <p className="measure mt-6 text-lead">
          Cafés especiais, doces do dia e lanches leves. Preços em reais.
        </p>
      </header>

      <nav
        aria-label="Categorias do cardápio"
        className="sticky top-16 z-30 mt-12 border-y border-rule-soft bg-surface"
      >
        <ul className="mx-auto flex max-w-page snap-x gap-2 overflow-x-auto px-gutter py-3">
          {categories.map((category) => (
            <li key={category.slug} className="snap-start">
              <a
                href={`#${category.slug}`}
                className="inline-flex h-9 items-center whitespace-nowrap rounded-full border-[1.5px] border-rule px-4 text-small font-medium hover:bg-ink hover:text-surface"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map((category) => (
        <section
          key={category.slug}
          id={category.slug}
          aria-labelledby={`${category.slug}-titulo`}
          className="mx-auto max-w-page scroll-mt-32 px-gutter pt-section"
        >
          <div>
            <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-3 border-b border-rule pb-6">
              <h2 id={`${category.slug}-titulo`} className="font-display text-h1 uppercase lg:text-display">
                {category.name}
              </h2>
              <p className="measure text-ink-muted">{intros[category.name]}</p>
            </div>
            <ul className="mt-8 grid gap-bento sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <li key={item.slug} className="flex">
                  <MenuItemCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section id="creditos" aria-labelledby="creditos-titulo" className="mx-auto max-w-page scroll-mt-32 px-gutter pt-section">
        <details className="rounded-card border border-rule-soft p-5">
          <summary id="creditos-titulo" className="inline-flex min-h-9 cursor-pointer items-center font-medium">
            Créditos das fotos
          </summary>
          <p className="mt-3 text-small text-ink-muted">
            Fotos ilustrativas de bancos gratuitos (Pexels e Wikimedia Commons). Fotos do Commons usadas sob as licenças
            indicadas.
          </p>
          <ul className="mt-4 grid gap-1 text-small text-ink-muted sm:grid-cols-2">
            {[...itemCredits, ...siteCredits].map((entry) => (
              <Credit key={entry.label} label={entry.label} image={entry.image} />
            ))}
          </ul>
        </details>
      </section>
    </>
  );
}
