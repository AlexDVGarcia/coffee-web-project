/**
 * Fotos do site, baixadas uma vez para public/images (créditos completos em public/images/CREDITS.md).
 * Pexels não exige atribuição; Wikimedia Commons exige autor + licença, exibidos no rodapé do cardápio.
 */

export type Credit =
  | { source: "Pexels"; page: string }
  | { source: "Wikimedia Commons"; page: string; author: string; license: string; licenseUrl: string };

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: Credit;
};

const pexels = (id: number): Credit => ({ source: "Pexels", page: `https://www.pexels.com/photo/${id}/` });

const commons = (file: string, author: string, license: string, licenseUrl: string): Credit => ({
  source: "Wikimedia Commons",
  page: `https://commons.wikimedia.org/wiki/File:${file}`,
  author,
  license,
  licenseUrl,
});

const BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0";

/** Fotos do cardápio, indexadas pelo slug do nome do item (ver slugify em lib/menu.ts). */
export const menuImages: Record<string, SiteImage> = {
  "expresso-advg": {
    src: "/images/menu/expresso-advg.webp", width: 1200, height: 800,
    alt: "Expresso com crema dourada em xícara branca sobre pires", credit: pexels(685527),
  },
  "expresso-duplo": {
    src: "/images/menu/expresso-duplo.webp", width: 1200, height: 801,
    alt: "Máquina de expresso extraindo duas doses em xícaras marrons", credit: pexels(324028),
  },
  ristretto: {
    src: "/images/menu/ristretto.webp", width: 1200, height: 1800,
    alt: "Dose curta de café em copinho de vidro sobre a balança da máquina", credit: pexels(9050518),
  },
  macchiato: {
    src: "/images/menu/macchiato.webp", width: 1200, height: 1200,
    alt: "Macchiato com desenho de espuma em xícara verde sobre fundo escuro", credit: pexels(14704662),
  },
  cortado: {
    src: "/images/menu/cortado.webp", width: 1200, height: 1500,
    alt: "Cortado em copo de vidro baixo sobre mesa de madeira", credit: pexels(4011869),
  },
  cappuccino: {
    src: "/images/menu/cappuccino.webp", width: 1200, height: 1800,
    alt: "Cappuccino visto de cima com desenho de folha na espuma", credit: pexels(13623762),
  },
  "flat-white": {
    src: "/images/menu/flat-white.webp", width: 1200, height: 800,
    alt: "Flat white com coração de leite em xícara de vidro escuro", credit: pexels(12703064),
  },
  "latte-de-baunilha": {
    src: "/images/menu/latte-de-baunilha.webp", width: 1200, height: 800,
    alt: "Latte em copo de vidro com camadas de café, leite e espuma", credit: pexels(685529),
  },
  mocha: {
    src: "/images/menu/mocha.webp", width: 1200, height: 1600,
    alt: "Mocha em taça de vidro com chantilly e calda de chocolate", credit: pexels(14761085),
  },
  "cold-brew": {
    src: "/images/menu/cold-brew.webp", width: 1200, height: 1800,
    alt: "Copo alto de cold brew com gelo, suado de frio, no balcão", credit: pexels(28901490),
  },
  "cold-brew-tonica": {
    src: "/images/menu/cold-brew-tonica.webp", width: 1200, height: 1800,
    alt: "Cold brew com tônica, gelo e fatia de laranja num copo alto", credit: pexels(38622185),
  },
  "iced-latte": {
    src: "/images/menu/iced-latte.webp", width: 1200, height: 1800,
    alt: "Leite sendo despejado sobre café gelado num copo alto", credit: pexels(10540639),
  },
  affogato: {
    src: "/images/menu/affogato.webp", width: 1200, height: 800,
    alt: "Bolas de sorvete de creme banhadas em expresso numa xícara branca",
    credit: commons("Vinoteca,_Smithfield,_London_(4485849609).jpg", "Ewan Munro", "CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0"),
  },
  "frappe-de-caramelo-salgado": {
    src: "/images/menu/frappe-de-caramelo-salgado.webp", width: 1200, height: 1599,
    alt: "Frappé de café em taça alta com chantilly e calda escorrendo",
    credit: commons(
      "Frappe_-_coffee_milkshake_with_whipped_cream_and_chocolate_(KETO,_LCHF,_Low_Carb,_Gluten_free,_FIT)_-_52774791604.jpg",
      "Ewelina Podrez-Siama", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0",
    ),
  },
  "matcha-latte-gelado": {
    src: "/images/menu/matcha-latte-gelado.webp", width: 1200, height: 1800,
    alt: "Matcha latte gelado em copo alto, verde sobre branco", credit: pexels(32695045),
  },
  "cha-gelado-de-hibisco": {
    src: "/images/menu/cha-gelado-de-hibisco.webp", width: 1200, height: 1500,
    alt: "Chá de hibisco vermelho sendo servido sobre gelo, com flor ao lado", credit: pexels(8678927),
  },
  "pao-de-queijo": {
    src: "/images/menu/pao-de-queijo.webp", width: 1200, height: 798,
    alt: "Pães de queijo dourados numa cestinha de vime",
    credit: commons("Cheesebread.jpg", "Murilo Manzini", "CC BY-SA 4.0", BY_SA_4),
  },
  "croissant-de-manteiga": {
    src: "/images/menu/croissant-de-manteiga.webp", width: 1200, height: 800,
    alt: "Croissant folhado e dourado sobre tábua de madeira", credit: pexels(19296861),
  },
  "pain-au-chocolat": {
    src: "/images/menu/pain-au-chocolat.webp", width: 1200, height: 831,
    alt: "Pain au chocolat com as barras de chocolate aparecendo nas pontas",
    credit: commons("Pain_au_chocolat_Luc_Viatour.jpg", "Luc Viatour", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0"),
  },
  "bolo-de-cenoura-com-brigadeiro": {
    src: "/images/menu/bolo-de-cenoura-com-brigadeiro.webp", width: 1200, height: 1600,
    alt: "Bolo de cenoura coberto de chocolate e granulado, com uma fatia cortada",
    credit: commons("Bolo_de_cenoura_com_chocolate_e_granulado.jpg", "Sintegrity", "CC BY-SA 4.0", BY_SA_4),
  },
  "cookie-de-chocolate": {
    src: "/images/menu/cookie-de-chocolate.webp", width: 1200, height: 1800,
    alt: "Cookies com gotas de chocolate e uma garrafa de leite ao fundo", credit: pexels(13921498),
  },
  "cheesecake-de-frutas-vermelhas": {
    src: "/images/menu/cheesecake-de-frutas-vermelhas.webp", width: 1200, height: 698,
    alt: "Fatia de cheesecake com calda vermelha, framboesas e mirtilos", credit: pexels(1126359),
  },
  "torrada-de-banana-e-canela": {
    src: "/images/menu/torrada-de-banana-e-canela.webp", width: 1200, height: 1800,
    alt: "Torrada com rodelas de banana caramelizada servida em prato escuro", credit: pexels(8143760),
  },
  "misto-quente-na-chapa": {
    src: "/images/menu/misto-quente-na-chapa.webp", width: 1200, height: 1800,
    alt: "Misto quente tostado cortado na diagonal, com queijo derretido", credit: pexels(14941252),
  },
  "croissant-de-presunto-e-queijo": {
    src: "/images/menu/croissant-de-presunto-e-queijo.webp", width: 1200, height: 800,
    alt: "Croissants recheados com presunto e queijo numa travessa", credit: pexels(17582424),
  },
  "pao-na-chapa-com-requeijao": {
    src: "/images/menu/pao-na-chapa-com-requeijao.webp", width: 1200, height: 960,
    alt: "Pão francês aberto e tostado na chapa com manteiga",
    credit: commons("P%C3%A3o_na_chapa_1.jpg", "Melsj", "CC BY-SA 4.0", BY_SA_4),
  },
  "caprese-no-focaccia": {
    src: "/images/menu/caprese-no-focaccia.webp", width: 1200, height: 1800,
    alt: "Sanduíche de focaccia com muçarela de búfala, tomate e folhas", credit: pexels(30301906),
  },
  "frango-com-pesto": {
    src: "/images/menu/frango-com-pesto.webp", width: 1200, height: 800,
    alt: "Sanduíche de ciabatta recheado com tomate e folhas verdes", credit: pexels(203089),
  },
  "toast-de-avocado": {
    src: "/images/menu/toast-de-avocado.webp", width: 1200, height: 800,
    alt: "Pão de fermentação natural com avocado amassado e ovo", credit: pexels(2067423),
  },
  "wrap-vegano-de-grao-de-bico": {
    src: "/images/menu/wrap-vegano-de-grao-de-bico.webp", width: 1200, height: 1500,
    alt: "Wrap de legumes cortado ao meio com tigelas de salada ao lado", credit: pexels(29535634),
  },
};

export const siteImages = {
  hero: {
    src: "/images/site/hero.webp", width: 2400, height: 1600,
    alt: "Interior de cafeteria com luz quente, barista no balcão e cliente à mesa", credit: pexels(36871073),
  },
  barista: {
    src: "/images/site/sobre-barista.webp", width: 1600, height: 1067,
    alt: "Mãos de barista despejando leite vaporizado e desenhando na espuma", credit: pexels(4927237),
  },
  founders: {
    src: "/images/site/sobre-fundadores.webp", width: 1600, height: 2399,
    alt: "Casal de avental rindo junto, em ambiente de cafeteria com luzes quentes", credit: pexels(9349539),
  },
  pastries: {
    src: "/images/site/sobre-vitrine.webp", width: 1600, height: 1067,
    alt: "Vitrine com doces e tortinhas feitos no dia", credit: pexels(31101247),
  },
  openMic: {
    src: "/images/site/evento-microfone-aberto.webp", width: 1600, height: 1067,
    alt: "Músico tocando violão para uma plateia atenta em luz âmbar", credit: pexels(27817822),
  },
  tasting: {
    src: "/images/site/evento-degustacao.webp", width: 1600, height: 2397,
    alt: "Xícaras de degustação com café e colheres sobre a mesa", credit: pexels(34505585),
  },
} satisfies Record<string, SiteImage>;
