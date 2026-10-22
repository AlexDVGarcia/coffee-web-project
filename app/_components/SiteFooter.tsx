import Link from "next/link";
import { hoursSummary } from "@/lib/hours";
import { CupMark } from "./CupMark";
import { LetterPattern } from "./LetterPattern";
import { TaglineStair } from "./TaglineStair";

const footerLink = "inline-flex min-h-9 items-center decoration-1 underline-offset-4 hover:underline";

/** Rodapé conforme docs/design/components.md › SiteFooter: painel espresso com o padrão de letras. */
export function SiteFooter() {
  return (
    <footer data-theme="roast" className="relative mt-section overflow-hidden rounded-t-panel bg-espresso text-roast">
      <LetterPattern letters="ADVG" />
      <div className="relative mx-auto grid max-w-page gap-12 px-gutter py-section text-ink md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-8">
          <TaglineStair
            as="p"
            size="h3"
            lines={[
              { text: "Onde as manhãs", column: 1 },
              { text: "ficam melhores", column: 2, align: "end" },
            ]}
          />
          <div className="flex items-center gap-3">
            <CupMark size={32} />
            <p className="text-small">ADVG Coffee Co — café especial de bairro desde a primeira xícara.</p>
          </div>
        </div>

        <div>
          <h2 className="text-h4 font-medium">Onde estamos</h2>
          <address className="mt-3 not-italic text-ink-muted">
            Centro, Itapecerica da Serra – SP
          </address>
          <h2 className="mt-8 text-h4 font-medium">Navegue</h2>
          <ul className="mt-2 flex flex-col">
            <li><Link href="/cardapio" className={footerLink}>Cardápio</Link></li>
            <li><Link href="/sobre" className={footerLink}>Sobre nós</Link></li>
            <li><Link href="/cardapio#creditos" className={footerLink}>Créditos das fotos</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-h4 font-medium">Horários</h2>
          <dl className="mt-3">
            {hoursSummary.map((row) => (
              <div key={row.days} className="flex justify-between gap-4 border-b border-rule-soft py-1.5">
                <dt className="text-ink-muted">{row.days}</dt>
                <dd className="tabular-nums">{row.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </footer>
  );
}
