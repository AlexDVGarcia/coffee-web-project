import Link from "next/link";
import { CupMark } from "./CupMark";

type NavItem = { href: string; label: string };

type SiteHeaderProps = {
  brandName: string;
  nav: NavItem[];
  cartCount?: number;
};

const navLink = "text-body font-medium underline-offset-6 decoration-1 hover:underline";

/**
 * Cabeçalho fixo no topo. No celular a navegação abre com <details>, sem JavaScript.
 * O filete inferior é o único separador — sem sombra.
 */
export function SiteHeader({ brandName, nav, cartCount = 0 }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule-soft bg-surface">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-gutter">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${brandName}, início`}>
          <CupMark size={28} />
          <span className="font-display text-h4 leading-none uppercase">{brandName}</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/sacola"
            className="inline-flex h-10 items-center gap-2 rounded-control px-3 text-body font-medium hover:bg-rule-soft"
          >
            Sacola
            <span className="grid min-w-6 place-items-center rounded-full bg-ink px-1.5 text-caption text-surface tabular-nums">
              {cartCount}
            </span>
            <span className="sr-only">{cartCount === 1 ? "item" : "itens"}</span>
          </Link>

          <details className="group relative md:hidden">
            <summary className="inline-flex h-10 cursor-pointer list-none items-center rounded-control px-3 font-medium hover:bg-rule-soft [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav
              aria-label="Principal"
              className="absolute right-0 top-12 flex w-56 flex-col rounded-card bg-surface-raised p-2 shadow-overlay"
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-control px-3 py-2.5 font-medium hover:bg-rule-soft"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
