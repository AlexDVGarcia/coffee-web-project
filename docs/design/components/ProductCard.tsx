import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { Tag } from "./Tag";

export type Product = {
  slug: string;
  name: string;
  /** Notas sensoriais curtas: "Cacau, laranja, mel". */
  notes: string;
  priceInCents: number;
  image: { src: string; alt: string };
  badge?: string;
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/**
 * Card de produto. O nome é o link e cobre o card inteiro (after:inset-0);
 * o botão fica acima dessa camada para continuar clicável.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-surface-raised">
      <div className="relative aspect-4/5 bg-crema">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
          className="object-cover"
        />
        {product.badge && (
          <div className="absolute left-3 top-3">
            <Tag tone="rose">{product.badge}</Tag>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="tagline text-h4">
          <Link
            href={`/cafes/${product.slug}`}
            className="after:absolute after:inset-0 group-hover:underline decoration-1 underline-offset-4"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-small text-ink-muted">{product.notes}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-rule-soft pt-3">
          <span className="text-lead font-medium tabular-nums">
            {brl.format(product.priceInCents / 100)}
          </span>
          <Button size="sm" className="relative z-10">
            Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
}
