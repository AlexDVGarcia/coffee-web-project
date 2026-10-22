import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteImages } from "@/lib/images";
import { buttonClasses } from "../_components/Button";
import { Panel } from "../_components/Panel";
import { ReserveButton } from "../_components/Reservation";
import { TaglineStair } from "../_components/TaglineStair";

export const metadata: Metadata = {
  title: "Sobre nós",
  description: "A história de Kátia e Alex, moradores de Itapecerica da Serra desde 2016, e de como nasceu a ADVG Coffee Co.",
};

/*
 * Conteúdo a confirmar com os donos: o ano de abertura e o significado da sigla ADVG.
 * O texto evita afirmar os dois.
 */

const values = [
  {
    title: "Vizinhança primeiro",
    text: "A gente conhece os clientes pelo nome e pelo pedido. A casa existe para ser o ponto de encontro do Centro.",
  },
  {
    title: "Quem planta, aparece",
    text: "Compramos de pequenos produtores do Sul de Minas e da Mantiqueira e contamos a história de cada lote no balcão.",
  },
  {
    title: "Feito na hora",
    text: "Bolos, cookies e pão de queijo saem do forno de manhã. O que não sai no dia não volta para a vitrine.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-page px-gutter pt-section">
        <TaglineStair
          as="h1"
          size="h1"
          className="max-w-4xl"
          lines={[
            { text: "Uma casa", column: 1 },
            { text: "de café", column: 1, align: "end" },
            { text: "feita por", column: 2 },
            { text: "vizinhos", column: 2, align: "end" },
          ]}
        />
        <p className="measure mt-8 text-lead">
          A ADVG Coffee Co é de Kátia e Alex, moradores de Itapecerica da Serra desde 2016. Esta é a história de como um
          café de domingo para os amigos virou endereço no Centro.
        </p>
      </section>

      <section className="mx-auto grid max-w-page items-center gap-12 px-gutter pt-section md:grid-cols-2">
        <figure>
          <div className="relative aspect-4/5 overflow-hidden rounded-card bg-crema">
            <Image src={siteImages.founders.src} alt={siteImages.founders.alt} fill sizes="(min-width: 48rem) 45vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-2 text-small text-ink-muted">Foto ilustrativa.</figcaption>
        </figure>
        <div className="measure">
          <h2 className="text-h3 font-medium">2016: a mudança</h2>
          <p className="mt-4">
            Kátia e Alex trocaram o apartamento em São Paulo por uma casa com quintal em Itapecerica da Serra. Queriam
            mais verde, menos trânsito e tempo para os filhos crescerem perto da avó.
          </p>
          <p className="mt-4">
            Gostaram de tudo, menos de uma coisa: não havia no Centro um lugar para sentar com calma e tomar um café bem
            feito. Para um bom expresso, era preciso pegar a estrada.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-page items-center gap-12 px-gutter pt-section md:grid-cols-2">
        <div className="measure md:order-2">
          <h2 className="text-h3 font-medium">O ensaio na cozinha</h2>
          <p className="mt-4">
            Kátia sempre foi a confeiteira da família. O bolo de cenoura com brigadeiro dela começou a sair por encomenda
            para os vizinhos e logo tinha fila no portão às sextas.
          </p>
          <p className="mt-4">
            Alex fez um curso de barista, comprou uma máquina usada e passou a torrar pequenos lotes de café na garagem.
            Os cafés de domingo para os amigos ficaram famosos na rua, e alguém sempre perguntava quando ia abrir de
            verdade.
          </p>
        </div>
        <div className="relative aspect-3/2 overflow-hidden rounded-card bg-crema md:order-1">
          <Image src={siteImages.barista.src} alt={siteImages.barista.alt} fill sizes="(min-width: 48rem) 45vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mx-auto grid max-w-page items-center gap-12 px-gutter pt-section md:grid-cols-2">
        <div className="relative aspect-3/2 overflow-hidden rounded-card bg-crema">
          <Image src={siteImages.pastries.src} alt={siteImages.pastries.alt} fill sizes="(min-width: 48rem) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="measure">
          <h2 className="text-h3 font-medium">A casa</h2>
          <p className="mt-4">
            Um dia a pergunta virou plano. Kátia e Alex abriram a ADVG Coffee Co no Centro, com cafés de pequenos
            produtores do Sul de Minas e da Mantiqueira e doces feitos todas as manhãs.
          </p>
          <p className="mt-4">
            O microfone aberto das sextas nasceu de um cliente que pediu para tocar violão num fim de tarde. A
            degustação de sábado é o Alex fazendo o que mais gosta: explicar por que cada café tem o gosto que tem.
          </p>
        </div>
      </section>

      <section aria-labelledby="valores" className="mx-auto max-w-page px-gutter pt-section">
        <Panel tone="olive" data-theme="roast">
          <h2 id="valores" className="text-h2 font-medium">O que levamos a sério</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="border-t border-current/40 pt-4">
                <h3 className="text-h4 font-medium">{value.title}</h3>
                <p className="mt-2">{value.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <ReserveButton />
            <Link href="/cardapio" className={buttonClasses({ variant: "secondary" })}>
              Ver cardápio
            </Link>
          </div>
        </Panel>
      </section>
    </>
  );
}
