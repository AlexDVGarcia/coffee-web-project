const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

type MenuRowProps = {
  name: string;
  description?: string;
  priceInCents: number;
  /** Tamanhos alternativos, ex.: [{ label: "200 ml", priceInCents: 1400 }] */
  variants?: { label: string; priceInCents: number }[];
};

/**
 * Linha do cardápio, como num quadro de balcão: nome à esquerda, preço à direita,
 * filete embaixo. Use dentro de <ul> — cada linha é um <li>.
 */
export function MenuRow({ name, description, priceInCents, variants }: MenuRowProps) {
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-rule py-4">
      <span className="tagline text-h4">{name}</span>
      <span className="text-h4 font-medium tabular-nums">{brl.format(priceInCents / 100)}</span>
      {description && (
        <p className="measure col-span-2 text-small text-ink-muted">{description}</p>
      )}
      {variants && variants.length > 0 && (
        <dl className="col-span-2 flex flex-wrap gap-x-5 text-small text-ink-muted">
          {variants.map((v) => (
            <div key={v.label} className="flex gap-1.5">
              <dt>{v.label}</dt>
              <dd className="tabular-nums text-ink">{brl.format(v.priceInCents / 100)}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}
