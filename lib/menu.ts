import fs from "node:fs";
import path from "node:path";
import { menuImages, type SiteImage } from "./images";

export type Badge = "Popular" | "Favorito da casa";

export type MenuItem = {
  slug: string;
  category: string;
  name: string;
  description: string;
  priceInCents: number;
  badge?: Badge;
  image: SiteImage;
};

export type MenuCategory = { name: string; slug: string; items: MenuItem[] };

const CSV_PATH = path.join(process.cwd(), "docs", "menu-items.csv");

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** CSV mínimo (RFC 4180): campos entre aspas podem conter vírgulas e aspas duplicadas. */
function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  row.push(field);
  if (row.some((cell) => cell !== "")) rows.push(row);
  return rows;
}

/** Lê docs/menu-items.csv. Leitura síncrona → o Next pré-renderiza as páginas que usam o cardápio. */
export function getMenu(): MenuItem[] {
  const [header, ...rows] = parseCsv(fs.readFileSync(CSV_PATH, "utf8").replace(/^﻿/, ""));
  const col = (name: string) => {
    const index = header.indexOf(name);
    if (index === -1) throw new Error(`menu-items.csv: coluna "${name}" não encontrada`);
    return index;
  };
  const c = { category: col("Categoria"), name: col("Nome"), description: col("Descrição"), price: col("Preço"), badge: col("Selo") };

  return rows.map((row) => {
    const slug = slugify(row[c.name]);
    const image = menuImages[slug];
    if (!image) throw new Error(`menu-items.csv: "${row[c.name]}" não tem foto em lib/images.ts (slug "${slug}")`);
    const badge = row[c.badge]?.trim();
    return {
      slug,
      category: row[c.category].trim(),
      name: row[c.name].trim(),
      description: row[c.description].trim(),
      priceInCents: Math.round(Number(row[c.price]) * 100),
      badge: badge === "Popular" || badge === "Favorito da casa" ? badge : undefined,
      image,
    };
  });
}

/** Categorias na ordem em que aparecem no CSV. */
export function getCategories(): MenuCategory[] {
  const categories = new Map<string, MenuCategory>();
  for (const item of getMenu()) {
    const category = categories.get(item.category) ?? { name: item.category, slug: slugify(item.category), items: [] };
    category.items.push(item);
    categories.set(item.category, category);
  }
  return [...categories.values()];
}

export function getPopular() {
  return getMenu().filter((item) => item.badge === "Popular");
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatPrice(priceInCents: number) {
  return brl.format(priceInCents / 100);
}
