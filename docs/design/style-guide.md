# Guia de estilo

A identidade vem das três referências em [`references/`](./references): papelaria e copo (1), posts sociais (2) e sacolas (3). Este guia traduz o que elas fazem no impresso para regras de tela.

## O que as referências ensinam

| Na referência | Regra para a web |
| --- | --- |
| Peças inteiras numa só cor chapada (sacola oliva, card oxblood, copo creme) | Separe conteúdo por **bloco de cor**, não por sombra nem borda. |
| Taglines em caixa-alta que descem em degrau, cada linha apoiada num filete ("A small / ritual / before / a big day") | O `TaglineStair` é o elemento-assinatura. Uma vez por tela, no máximo. |
| Wordmark pesadíssimo e um símbolo de xícara simples | Peso extremo só no logotipo e em títulos-cartaz. O resto do texto é uma grotesca calma. |
| Letras gigantes cortadas, quase da cor do fundo | `LetterPattern` como textura de fundo em seções escuras ou oliva. |
| Painéis com cantos bem arredondados em grade bento, peças internas retas | Raio grande no contêiner, raio pequeno ou zero no que está dentro. |
| Fotografia quente, luz natural, grão, pessoas em movimento | Fotos são conteúdo, não decoração. Nunca ilustração genérica de grãos de café. |

## Cor

### Paleta

| Token | Hex | Papel |
| --- | --- | --- |
| `espresso` | `#1E1410` | Fundo do tema escuro; texto principal no claro. Substitui o preto. |
| `roast` | `#2C211B` | Superfície elevada no escuro; letras do padrão. |
| `oxblood` | `#3D110E` | Bloco de cor sóbrio; hover da ação primária. |
| `crema` | `#EBD9BF` | Cor do copo. Texto no escuro; superfície elevada no claro. |
| `paper` | `#F5F0E7` | Fundo do tema claro. |
| `olive` | `#4B5531` | Acento principal da marca; foco no claro. |
| `moss` | `#3E4A26` | Hover do oliva. |
| `rose` | `#D48A92` | Acento secundário, só como preenchimento; foco no escuro. |
| `cacao` | `#6E5A4C` | Texto secundário no claro. |
| `steam` | `#B9A894` | Texto secundário no escuro. |
| `ember` | `#A3352B` | Erro e ações destrutivas. |

### Proporção

Como nas referências: **60% neutros** (paper/crema ou espresso), **25% marrons profundos** (espresso/oxblood), **10% oliva**, **5% rosa**. O rosa aparece em pequenas doses: uma faixa, uma etiqueta, a seleção de texto. Se uma tela ficar rosa, está errado.

### Pares aprovados (WCAG 2.2)

| Texto | Fundo | Contraste | Uso |
| --- | --- | --- | --- |
| espresso | paper | 15.9 : 1 | Texto corrido no claro |
| crema | espresso | 13.1 : 1 | Texto corrido no escuro |
| crema | oxblood | 11.8 : 1 | Painel oxblood |
| paper | olive | 7.0 : 1 | Painel e botão oliva |
| crema | olive | 5.8 : 1 | Texto grande sobre oliva |
| espresso | rose | 6.8 : 1 | Etiqueta e faixa rosa |
| cacao | paper | 5.7 : 1 | Texto secundário no claro |
| steam | espresso | 7.8 : 1 | Texto secundário no escuro |
| ember | paper | 6.0 : 1 | Mensagem de erro |

**Proibido:** texto rosa sobre paper/crema (2.3 : 1), texto oliva sobre espresso, cinzas neutros (`zinc`, `gray`) — a paleta padrão do Tailwind está desligada em `tokens.css`.

### Temas

Dois temas com os mesmos papéis semânticos:

- **Papel** (`data-theme="paper"`, padrão): fundo paper, texto espresso.
- **Torra** (`data-theme="roast"`): fundo espresso, texto crema. Ativado por `prefers-color-scheme: dark` ou forçado pelo atributo.

Componentes usam sempre os papéis (`bg-surface`, `text-ink`, `border-rule`…). Os primitivos (`bg-olive`, `bg-oxblood`) só aparecem em blocos de marca via `Panel`, que já fixa a cor de texto correta.

## Tipografia

### Famílias

| Papel | Família | Por quê |
| --- | --- | --- |
| Texto e taglines | **Instrument Sans** (variável, 400–700, eixo de largura 75–100) | Grotesca de desenho limpo como a das taglines da referência; o eixo `wdth` permite rótulos condensados sem trocar de família. |
| Display | **Bowlby One** | Massa preta e terminais alargados próximos ao wordmark. Só para títulos-cartaz e o `LetterPattern`. |
| Logotipo | **SVG do wordmark** | O wordmark da marca é desenhado à mão e não deve ser imitado com fonte. Até chegar o arquivo, o `SiteHeader` usa Bowlby One como substituto. |

Carregamento em `app/layout.tsx` via `next/font/google` — veja o [README](./README.md#integração).

### Escala

Escala clássica de Bringhurst (*The Elements of Typographic Style*): 12 · 14 · 16 · 18 · 21 · 24 · 36 · 48 · 60–96.

| Token | Tamanho | Entrelinha | Uso |
| --- | --- | --- | --- |
| `text-caption` | 12px | 1.4 | Contadores, legendas de foto |
| `text-small` | 14px | 1.45 | Notas sensoriais, ajuda de campo, metadados |
| `text-body` | 16px | 1.55 | Texto corrido, botões |
| `text-lead` | 18px | 1.5 | Abertura de seção, preço em destaque |
| `text-h4` | 21px | 1.3 | Nome de produto, linha de cardápio |
| `text-h3` | 24px | 1.2 | Título de bloco |
| `text-h2` | 28→36px | 1.08 | Título de seção, `TaglineStair` padrão |
| `text-h1` | 36→48px | 1.04 | Título de página |
| `text-display` | 60→96px | 0.92 | Título-cartaz (Bowlby One) |
| `text-poster` | 80→192px | 0.82 | Wordmark gigante, uma vez por página |

### Regras

- **Caixa-alta é da marca, não da interface.** Use a utilidade `tagline` (caixa-alta, peso 500, espaçamento quase neutro) em taglines, nomes de produto e linhas de cardápio — como nas peças impressas. Botões, rótulos de campo, navegação e mensagens ficam em caixa normal de frase.
- **Peso:** 400 para texto, 500 para taglines e botões, 600 só para números que precisam destacar. Nada de 700+ na Instrument Sans: o peso pesado é papel da display.
- **Medida:** texto corrido até 65 caracteres (`measure` = 36rem).
- **Números:** preços e quantidades com `tabular-nums`.
- **Não faça:** destacar uma palavra do título com cor ou itálico; pôr rótulo em caixa-alta espaçada acima de cada título; usar fonte monoespaçada para dados.

## Espaço e layout

- **Unidade:** 4px (o `--spacing` do Tailwind). Use os passos 1, 2, 3, 4, 6, 8, 12, 16, 24.
- **Tokens fluidos:** `gutter` (16→40px) nas laterais, `section` (64→144px) entre seções, `panel` (20→48px) dentro de painéis, `bento` (12→24px) entre painéis.
- **Contêiner:** `max-w-page` (84rem) centrado, com `px-gutter`.
- **Alinhamento:** texto alinhado à esquerda. Centralizar só em telas vazias e confirmações. O degrau do `TaglineStair` é a única exceção controlada.

### A grade bento

A composição da referência 1 é o padrão para home e páginas de coleção: painéis de tamanhos diferentes, cada um numa cor, sobre o fundo paper.

```
┌───────────────────────┬────────────┬──────────────┐
│                       │  foto      │              │
│  painel oxblood       │  (rosa)    │  foto alta   │
│  tagline em degrau    ├────────────┤  do espresso │
│                       │  olive     │  saindo      │
│                       │  xícara    │              │
├───────┬───────────────┴────────────┤              │
│ crema │  espresso — wordmark       │              │
│ cores │                            │              │
└───────┴────────────────────────────┴──────────────┘
```

Em Tailwind: `grid grid-cols-6 gap-bento` com `col-span`/`row-span` por painel. Abaixo de `md`, tudo vira uma coluna na ordem de leitura; a foto alta passa a `aspect-4/5`.

Regras do bento:
1. Dois painéis vizinhos nunca têm a mesma cor.
2. No máximo um painel oliva e um rosa por grade.
3. Pelo menos um painel é foto sangrando até a borda (`Panel padding="flush"`).

## Forma

| Token | Valor | Onde |
| --- | --- | --- |
| `rounded-panel` | 28px | Painéis do bento, seções em bloco |
| `rounded-card` | 18px | Cards de produto, story tiles, menus suspensos |
| `rounded-control` | 6px | Botões, campos, stepper |
| `rounded-full` | — | Só etiquetas (`Tag`) e o contador da sacola |

Raio diminui conforme o elemento fica menor e mais interno. Filetes: 1px (`border-rule` forte, `border-rule-soft` suave); bordas de controle: 1.5px.

**Sombra** existe só para o que flutua sobre a página (menu, drawer, modal, toast): `shadow-overlay`. Cards e painéis não têm sombra.

## Símbolo e padrão

- **`CupMark`**: tigela com fenda sobre pires reto. Herda `currentColor`. Mínimo 16px; área de respiro igual à altura da fenda.
- **`LetterPattern`**: letras do nome em Bowlby One, ~3× a altura da seção, giradas, um tom acima do fundo (`text-roast` em espresso, `text-moss` em olive). Só em seções sem texto corrido por cima: rodapé, hero escuro, página 404.

## Fotografia

- Luz natural quente, sombras profundas, grão leve. Cores puxando para âmbar e marrom.
- Assuntos: o café sendo feito (extração, vaporização), mãos segurando o copo, pessoas de passagem, o balcão.
- Enquadramento fechado ou com uma pessoa fora de foco em movimento (referência 2).
- Sempre com `next/image`, `sizes` correto e `alt` que descreve a cena ("Espresso escorrendo do porta-filtro para um copo de papel creme").
- Proibido: banco de imagens com grãos de café em fundo branco, latte art de cima em mesa de madeira genérica.

## Movimento

Um único momento orquestrado: no hero, os filetes do `TaglineStair` se desenham em sequência (`animate`), 640ms cada, com 140ms de intervalo, na curva `ease-pour`. Fora isso, só movimento que responde a uma ação:

| Token | Valor | Uso |
| --- | --- | --- |
| `--duration-fast` | 120ms | Hover de cor, borda de campo |
| `--duration-base` | 200ms | Botões, abrir menu |
| `--duration-slow` | 360ms | Drawer, modal |
| `ease-pour` | `cubic-bezier(.2,.7,.2,1)` | Entradas |
| `ease-snap` | `cubic-bezier(.3,0,.2,1)` | Estados de controle |

Com `prefers-reduced-motion: reduce`, as durações vão a zero e `motion-safe:` desliga a animação dos filetes.

Não faça: fade-and-slide em cada seção ao rolar, hover que levanta cards, parallax.

## Voz e texto

A marca fala pouco e com calma — "Um pequeno ritual antes de um grande dia", "Onde as manhãs ficam melhores", "Momentos coados aqui".

- **Taglines:** frases curtas, partidas em duas metades que funcionam no degrau. Sem ponto final.
- **Interface:** verbos diretos em caixa de frase. O botão diz o que acontece: "Adicionar à sacola", "Finalizar pedido", "Salvar endereço". A mesma ação mantém o nome do botão até a confirmação ("Adicionado à sacola").
- **Erros:** dizem o que houve e como resolver, sem pedir desculpas. "Informe um CEP com 8 números."
- **Vazio:** convida a agir. "Sua sacola está vazia. Comece pelos cafés da semana."
- **Produto:** nome + origem + 3 notas sensoriais. "Mantiqueira — cacau, laranja, mel".
- Use "você", nunca "o usuário".

## Acessibilidade (piso, não meta)

- Contraste mínimo 4.5:1 para texto, 3:1 para ícones e bordas de controle — veja os pares aprovados.
- Foco visível em tudo: contorno de 2px na cor `focus` (oliva no claro, rosa no escuro), 3px de afastamento.
- Alvos de toque ≥ 36px (botão `sm`) e ≥ 44px nos controles principais.
- Taglines em degrau: leitores de tela recebem a frase inteira (`sr-only`), os pedaços ficam `aria-hidden`.
- Responsivo até 320px sem rolagem horizontal.
