import Link from "next/link";
import { CupMark } from "./CupMark";
import { NavLink } from "./NavLink";
import { ReserveButton } from "./Reservation";

const nav = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/sobre", label: "Sobre nós" },
];

const navLink =
  "text-body font-medium decoration-1 underline-offset-6 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2";

/**
 * Cabeçalho fixo no topo, adaptado de docs/design/components/SiteHeader.tsx:
 * no lugar da sacola, o botão de reserva. No celular a navegação abre com <details>, sem JavaScript.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule-soft bg-surface">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-gutter">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ADVG Coffee Co, início">
          <CupMark size={28} />
          <span className="font-display text-h4 leading-none uppercase">ADVG</span>
          <span className="hidden text-small font-medium uppercase sm:inline">Coffee Co</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} className={navLink}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ReserveButton size="sm">
            <span className="sm:hidden">Reservar</span>
            <span className="hidden sm:inline">Reservar uma mesa</span>
          </ReserveButton>

          <details className="relative md:hidden">
            <summary className="inline-flex h-11 cursor-pointer list-none items-center rounded-control px-3 font-medium hover:bg-rule-soft [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav
              aria-label="Principal"
              className="absolute right-0 top-12 flex w-56 flex-col rounded-card bg-surface-raised p-2 shadow-overlay"
            >
              {nav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="rounded-control px-3 py-2.5 font-medium hover:bg-rule-soft aria-[current=page]:underline"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
