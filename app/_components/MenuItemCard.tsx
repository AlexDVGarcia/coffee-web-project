import Image from "next/image";
import { formatPrice, type MenuItem } from "@/lib/menu";
import { cx } from "./cx";
import { Tag } from "./Tag";

type MenuItemCardProps = {
  item: MenuItem;
  /** "feature": destaque da home (foto 4:5). "menu": cardápio completo (foto quadrada, mais compacto). */
  variant?: "feature" | "menu";
  /** Mostra a categoria acima do nome (útil fora do cardápio, onde a categoria não está no título da seção). */
  showCategory?: boolean;
};

/**
 * Variação do ProductCard (docs/design/components.md) sem ação de compra:
 * foto, selo, nome em caixa-alta com preço na mesma linha (como o MenuRow), descrição.
 */
export function MenuItemCard({ item, variant = "menu", showCategory = false }: MenuItemCardProps) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-card bg-surface-raised">
      <div className={cx("relative bg-crema", variant === "feature" ? "aspect-4/5" : "aspect-square")}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes={
            variant === "feature"
              ? "(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw"
              : "(min-width: 64rem) 25vw, (min-width: 40rem) 45vw, 100vw"
          }
          className="object-cover"
        />
        {item.badge && (
          <div className="absolute left-3 top-3">
            <Tag tone={item.badge === "Popular" ? "rose" : "olive"}>{item.badge}</Tag>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {showCategory && <p className="text-small text-ink-muted">{item.category}</p>}
        <div className="flex items-baseline justify-between gap-4 border-b border-rule-soft pb-2">
          <h3 className="tagline text-h4">{item.name}</h3>
          <p className="shrink-0 text-h4 font-medium tabular-nums">{formatPrice(item.priceInCents)}</p>
        </div>
        <p className="pt-1 text-small text-ink-muted">{item.description}</p>
      </div>
    </article>
  );
}
