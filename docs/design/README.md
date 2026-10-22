# Sistema de design

Sistema visual do coffee-web-project, construído a partir das referências em [`references/`](./references) e da stack do projeto: **Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · next/font**.

## Ideia central

Uma cafeteria que se apresenta como a sua papelaria: **blocos de cor chapada** (espresso, oxblood, oliva, creme, um toque de rosa), uma **grotesca calma em caixa-alta** para as frases da marca e um único gesto memorável — a **tagline em degrau** apoiada em filetes. Sem sombras decorativas, sem degradês, sem cinzas.

Princípios:
1. **Cor separa, não sombra.** Hierarquia vem de trocar o bloco de cor.
2. **Um gesto por tela.** A tagline em degrau ou o wordmark gigante — nunca os dois disputando.
3. **A marca fala em caixa-alta; a interface, em caixa de frase.**
4. **Foto é conteúdo.** Café sendo feito, gente de passagem, luz quente.
5. **Raio segue hierarquia.** Grande no contêiner, pequeno no controle.

## Arquivos

| Arquivo | Conteúdo |
| --- | --- |
| [`style-guide.md`](./style-guide.md) | Cor, tipografia, layout bento, forma, fotografia, movimento, voz, acessibilidade |
| [`components.md`](./components.md) | Especificação de cada componente: anatomia, variantes, estados, acessibilidade, uso |
| [`tokens/tokens.css`](./tokens/tokens.css) | Tokens prontos para Tailwind v4 (`@theme`) com temas claro/escuro |
| [`tokens/tokens.json`](./tokens/tokens.json) | Mesmos tokens no formato W3C DTCG (Figma / Tokens Studio) |
| [`components/`](./components) | Implementações de referência em TSX |
| [`references/`](./references) | Imagens de referência |

## Integração

### 1. Tokens

Substitua o conteúdo de `app/globals.css` por:

```css
@import "tailwindcss";
@import "../docs/design/tokens/tokens.css";
```

Isso remove a paleta padrão do Tailwind e expõe utilitários como `bg-surface`, `text-ink`, `bg-olive`, `rounded-panel`, `text-h2`, `px-gutter`, `tagline`.

### 2. Fontes

Em `app/layout.tsx`, troque Geist por:

```tsx
import { Bowlby_One, Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  axes: ["wdth"],
});

const bowlbyOne = Bowlby_One({
  variable: "--font-bowlby-one",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${instrumentSans.variable} ${bowlbyOne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

Para forçar um tema, use `data-theme="paper"` ou `data-theme="roast"` em `<html>` ou em qualquer seção.

### 3. Componentes

Copie os arquivos de `components/` para a pasta de componentes do app (ex.: `app/_components/`). Eles usam só `react`, `next/link` e `next/image`. Imagens remotas precisam de `images.remotePatterns` em `next.config.ts`.

## Pendências de marca

- **Wordmark e símbolo oficiais em SVG.** O `CupMark` é um redesenho aproximado da xícara da referência; o nome no cabeçalho usa Bowlby One como substituto.
- **Nome da marca:** ADVG Coffee Co. As referências mostram "DRYPT" apenas como direção visual; o `LetterPattern` usa `letters="ADVG"`.
- **Fotografia própria** seguindo o guia em `style-guide.md#fotografia`.
