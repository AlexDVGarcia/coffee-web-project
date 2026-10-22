import Image from "next/image";
import { cx } from "./cx";

type StoryTileProps = {
  image: { src: string; alt: string };
  /** Primeira metade da frase, no topo. */
  top: string;
  /** Segunda metade, na base. A frase é lida de cima para baixo, atravessando a foto. */
  bottom: string;
  className?: string;
};

/**
 * Foto com a frase partida entre topo e base (referência 2, "Your pause / between places").
 * A foto precisa de áreas escuras nas bordas; o degradê só garante o contraste mínimo.
 */
export function StoryTile({ image, top, bottom, className }: StoryTileProps) {
  return (
    <figure
      className={cx(
        "relative isolate flex aspect-4/5 flex-col justify-between overflow-hidden rounded-card p-5 text-paper",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 64rem) 33vw, 100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(30_20_16/0.55),transparent_30%,transparent_70%,rgb(30_20_16/0.55))]"
      />
      <figcaption className="contents">
        <span className="tagline text-h4">{top}</span>
        <span className="tagline text-h4">{bottom}</span>
      </figcaption>
    </figure>
  );
}
