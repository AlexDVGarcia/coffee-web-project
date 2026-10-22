"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Link de navegação que marca a página atual com aria-current (estilizado via aria-[current=page]:).
 * Fecha o menu <details> do celular ao navegar, já que o cabeçalho persiste entre páginas.
 */
export function NavLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const current = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      onClick={(event) => {
        event.currentTarget.closest("details")?.removeAttribute("open");
        onClick?.(event);
      }}
      {...props}
    />
  );
}
