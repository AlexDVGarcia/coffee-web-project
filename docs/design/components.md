# Especificações de componentes

Implementações de referência em [`components/`](./components) — TypeScript, React 19, Tailwind v4, Server Components por padrão (só `QuantityStepper` é cliente). Todas passam em `tsc` e `eslint` do projeto. Ao levar para o app, copie para `app/_components/` (ou `components/`) e importe com `@/`.

Convenções comuns:
- Cores vêm dos papéis semânticos (`bg-surface`, `text-ink`, `border-rule`). Primitivos só em `Panel`, `Tag` e `LetterPattern`.
- Estados: `hover`, `focus-visible` (global, em `tokens.css`), `active`, `disabled` (opacidade 45%), `aria-busy`, `aria-invalid`.
- Props estendem os atributos nativos do elemento (`ComponentPropsWithRef<"button">` etc.); `ref` é prop comum no React 19.

---

## Button

`components/Button.tsx` — ação dentro da página. Para navegar, use `<Link className={buttonClasses({...})}>`.

| Variante | Claro | Escuro | Quando |
| --- | --- | --- | --- |
| `primary` | espresso / texto crema → hover oxblood | crema / texto espresso → hover paper | Uma por bloco: a ação principal |
| `secondary` | contorno 1.5px ink → hover preenche | igual, invertido | Ação alternativa ao lado da primária |
| `accent` | olive / texto paper → hover moss | igual | Ação de marca em painéis claros ("Assinar o clube") |
| `quiet` | texto sublinhado, sem caixa | igual | Ações terciárias, "Ver todos" |

| Tamanho | Altura | Padding | Texto |
| --- | --- | --- | --- |
| `sm` | 36px | 14px | 14px |
| `md` | 44px | 20px | 16px |
| `lg` | 52px | 28px | 18px |

- Raio `control` (6px), peso 500, caixa de frase, sem ícone de seta no rótulo.
- `active`: desce 1px. `disabled`: 45% de opacidade, sem ponteiro.
- `loading` + `loadingLabel`: troca o rótulo ("Adicionando…"), aplica `aria-busy` e desabilita.
- `type="button"` por padrão; em formulários, passe `type="submit"`.

```tsx
<Button>Adicionar à sacola</Button>
<Button variant="secondary">Ver cardápio</Button>
<Link href="/clube" className={buttonClasses({ variant: "accent", size: "lg" })}>Conhecer o clube</Link>
```

## Tag

`components/Tag.tsx` — informação curta, não clicável.

- Altura 24px, padding 10px, `rounded-full`, 12px peso 500, caixa de frase.
- Tons: `neutral` (borda `rule-soft`), `olive` (paper sobre oliva), `rose` (espresso sobre rosa — para "Novo", "Edição limitada").
- No máximo uma `Tag` rosa por card.

## TextField

`components/TextField.tsx`

- Rótulo sempre visível acima (14px, 500). Placeholder só como exemplo de formato, nunca no lugar do rótulo.
- Campo: 44px, borda 1.5px `rule`, raio `control`, fundo `surface`. Hover: borda `ink`. Foco: contorno global `focus`.
- `hint`: ajuda em `ink-muted`. `error`: substitui a ajuda, borda e texto `danger`, `aria-invalid` e `aria-describedby` automáticos.
- IDs gerados com `useId` quando `id` não é passado.

```tsx
<TextField label="CEP" inputMode="numeric" autoComplete="postal-code" hint="Só números" error={state.errors?.cep} />
```

## QuantityStepper (cliente)

`components/QuantityStepper.tsx`

- Grupo com contorno 1.5px, botões 36×36 (− / +), valor no centro em `tabular-nums`.
- `role="group"` com `aria-label="Quantidade de {item}"`; botões com rótulos completos ("Adicionar um Flat white"); valor em `<output aria-live="polite">`.
- Limita entre `min` e `max`; o botão no limite fica desabilitado.
- Não controlado (`defaultValue`) com `onChange` para sincronizar com a sacola.

## Panel

`components/Panel.tsx` — o bloco de cor do bento. Polimórfico (`as="section" | "article" | "div"`).

| Tom | Fundo | Texto |
| --- | --- | --- |
| `espresso` | #1E1410 | crema |
| `oxblood` | #3D110E | crema |
| `olive` | #4B5531 | paper |
| `rose` | #D48A92 | espresso |
| `crema` | #EBD9BF | espresso |
| `paper` | #F5F0E7 | espresso |

- Raio `panel` (28px), `overflow-hidden`, padding fluido `panel`; `padding="flush"` para fotos sangradas.
- Sem borda, sem sombra. Os tons de texto já são pares aprovados — não sobrescreva.
- Componentes dentro de um painel escuro devem estar num tema compatível: envolva com `data-theme="roast"` para que `Button`/`TextField` invertam.

```tsx
<Panel tone="oxblood" data-theme="roast" className="col-span-3 row-span-2">…</Panel>
```

## TaglineStair — elemento-assinatura

`components/TaglineStair.tsx`

Tagline em caixa-alta que desce em degraus por uma grade de 2 colunas, cada linha apoiada num filete de 1px na cor do texto.

- `lines`: `{ text, column: 1 | 2, align?: "start" | "end" }[]`, renderizadas em ordem, uma por linha da grade.
- `size`: `h3` | `h2` (padrão) | `h1`. `as`: `h1` | `h2` | `p`.
- `animate`: filetes se desenham em sequência (640ms, +140ms por linha, `ease-pour`), respeitando `motion-safe`. **Use em uma única tagline por página** — normalmente a do hero.
- Leitor de tela lê a frase inteira; os pedaços visuais são `aria-hidden`.
- Cada metade cabe em uma linha da coluna; quebre a frase em 3–4 pedaços de até ~14 caracteres.

```tsx
<TaglineStair
  as="h1"
  size="h1"
  animate
  lines={[
    { text: "Um pequeno", column: 1 },
    { text: "ritual", column: 1, align: "end" },
    { text: "antes de", column: 2 },
    { text: "um grande dia", column: 2 },
  ]}
/>
```

## ProductCard

`components/ProductCard.tsx`

```
┌──────────────────────┐
│ [Novo]               │  ← Tag rosa opcional
│                      │
│      foto 4:5        │  ← fundo crema enquanto carrega
│                      │
├──────────────────────┤
│ MANTIQUEIRA          │  ← tagline, h4, link que cobre o card
│ Cacau, laranja, mel  │  ← small, ink-muted
│ ──────────────────── │  ← rule-soft
│ R$ 54,90 [Adicionar] │  ← lead tabular + Button sm
└──────────────────────┘
```

- Fundo `surface-raised`, raio `card`, sem sombra.
- O nome é o único link; `after:inset-0` estende a área clicável ao card. O botão fica em `z-10` por cima.
- Hover: sublinha o nome. A foto não dá zoom.
- Preço formatado com `Intl.NumberFormat("pt-BR", { currency: "BRL" })` a partir de centavos.
- Grade: `grid gap-bento sm:grid-cols-2 lg:grid-cols-4`.

## MenuRow

`components/MenuRow.tsx` — o cardápio do balcão.

- `<li>` em grade `1fr auto`: nome (tagline, h4) à esquerda, preço (h4, tabular) à direita, filete `rule` embaixo.
- Descrição opcional em `small`/`ink-muted`, limitada à `measure`.
- Variações de tamanho como `<dl>` em linha: "200 ml R$ 14,00 · 300 ml R$ 17,00".
- Agrupe por categoria com um `h2` acima de cada `<ul>`.

## StoryTile

`components/StoryTile.tsx` — foto com a frase partida entre topo e base (referência 2).

- `aspect-4/5`, raio `card`, padding 20px, texto paper em `tagline` h4.
- Degradê espresso 55% só nas bordas superior e inferior para garantir contraste; escolha fotos com bordas escuras.
- A frase deve fazer sentido lida de cima para baixo: `top="Sua pausa"` `bottom="Entre lugares"`.

## SiteHeader

`components/SiteHeader.tsx`

- Fixo no topo, 64px, fundo `surface`, filete inferior `rule-soft`. Sem sombra, sem blur.
- Esquerda: `CupMark` 28px + nome em display (substituir pelo SVG do wordmark).
- Centro (≥ md): links 16px/500, sublinhado no hover.
- Direita: "Sacola" com contador em pílula `ink`; no celular, "Menu" abre `<details>` com o painel `surface-raised` + `shadow-overlay` — funciona sem JavaScript.

## CupMark

`components/CupMark.tsx` — SVG 48×48, `currentColor`, `size` em px (mín. 16). Com `title`, vira imagem acessível; sem, é decorativo.

## LetterPattern

`components/LetterPattern.tsx` — letras gigantes da marca atrás do conteúdo (referência 3).

- O pai define `relative overflow-hidden` e a cor das letras via `text-*` (um tom acima do fundo).
- Posições fixas, sem aleatoriedade (render idêntico no servidor e no cliente).
- `aria-hidden`, `pointer-events-none`. Nunca atrás de texto corrido.

```tsx
<footer className="relative overflow-hidden bg-espresso text-roast" data-theme="roast">
  <LetterPattern letters="ADVG" />
  <div className="relative text-ink">…</div>
</footer>
```

---

## Especificados, ainda sem implementação

Construa seguindo os mesmos tokens quando forem necessários.

### FilterChip
Botão alternável para filtros do catálogo (torra, método, origem). 36px, `rounded-full`, borda 1.5px `rule`; selecionado: fundo `ink`, texto `surface`, `aria-pressed="true"`. Em grupo, rolagem horizontal no celular com `snap-x`.

### CartDrawer
Painel lateral direito, 100% no celular e 420px a partir de `md`. Fundo `surface`, `shadow-overlay`, abre em 360ms `ease-pour`. Use `<dialog>` com `showModal()` para foco preso e `Esc`. Cabeçalho "Sua sacola" + fechar; lista de itens com `QuantityStepper`; rodapé fixo com subtotal e `Button lg` "Finalizar pedido". Vazio: "Sua sacola está vazia. Comece pelos cafés da semana." + link.

### Toast
Canto inferior (centro no celular, direita no desktop), fundo `surface-inverse`, texto `ink-inverse`, raio `card`, `shadow-overlay`, `role="status"`. Repete o verbo da ação: "Adicionado à sacola". Some em 4s; ações desfazíveis ganham botão `quiet` "Desfazer".

### Modal
`<dialog>` nativo, largura máx. 32rem, raio `panel`, padding `panel`, fundo `surface`. Backdrop `espresso` a 60%. Título h3, ações alinhadas à direita: `secondary` à esquerda da `primary`.

### SiteFooter
`Panel tone="espresso"` sangrando na largura da página (raio só em cima), com `LetterPattern`, `TaglineStair` pequena e sem `animate` (única exceção à regra de uma tagline em degrau por tela) ("Onde as manhãs / ficam melhores"), endereço, horário em `<dl>`, links sociais e newsletter com `TextField` + `Button accent`.

### EmptyState
Centralizado, `CupMark` 48px em `ink-muted`, frase h3 que convida a agir e um `Button`. Nunca ilustração.
