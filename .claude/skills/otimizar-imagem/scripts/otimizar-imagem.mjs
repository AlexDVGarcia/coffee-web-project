#!/usr/bin/env node
/**
 * Baixa uma imagem de uma URL, redimensiona para uso no site e grava em WebP dentro de public/.
 *
 * Uso:
 *   node .claude/skills/otimizar-imagem/scripts/otimizar-imagem.mjs <url> <saida.webp> [--width 1600] [--quality 80]
 *   node .claude/skills/otimizar-imagem/scripts/otimizar-imagem.mjs --manifest lote.json [--quality 80]
 *
 * Manifesto: [{ "url": "...", "out": "public/images/menu/x.webp", "width": 1200 }, ...]
 * Saída: uma linha JSON por imagem com { out, src, width, height, bytes } (ou { out, error }).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve("public");
const USER_AGENT = "ADVGCoffeeImageBot/1.0 (otimizar-imagem skill; site asset pipeline)";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    width: { type: "string", default: "1600" },
    quality: { type: "string", default: "80" },
    manifest: { type: "string" },
  },
});

const quality = Number(values.quality);

async function download(url, attempt = 1) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT }, redirect: "follow" });
  // Wikimedia responde 429 quando várias imagens são baixadas em sequência; espera e tenta de novo.
  if ((res.status === 429 || res.status === 503) && attempt < 5) {
    const wait = Number(res.headers.get("retry-after")) * 1000 || 2000 * 2 ** attempt;
    await new Promise((r) => setTimeout(r, wait));
    return download(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} ao baixar ${url}`);
  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) throw new Error(`content-type inesperado "${type}" em ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function optimize({ url, out, width }) {
  const target = path.resolve(out);
  if (!target.startsWith(PUBLIC_DIR + path.sep)) throw new Error(`saída precisa ficar dentro de public/: ${out}`);
  if (path.extname(target) !== ".webp") throw new Error(`saída precisa terminar em .webp: ${out}`);

  const input = await download(url);
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: Number(width), withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer({ resolveWithObject: true });

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, data);

  const src = "/" + path.relative(PUBLIC_DIR, target).split(path.sep).join("/");
  return { out: path.relative(process.cwd(), target).split(path.sep).join("/"), src, width: info.width, height: info.height, bytes: data.length };
}

const jobs = values.manifest
  ? JSON.parse(await readFile(values.manifest, "utf8"))
  : [{ url: positionals[0], out: positionals[1], width: values.width }];

if (!jobs.length || jobs.some((j) => !j.url || !j.out)) {
  console.error("Uso: otimizar-imagem.mjs <url> <saida.webp> [--width N] [--quality N] | --manifest lote.json");
  process.exit(1);
}

let failed = 0;
for (const job of jobs) {
  try {
    console.log(JSON.stringify(await optimize({ width: values.width, ...job })));
  } catch (err) {
    failed++;
    console.log(JSON.stringify({ out: job.out, error: err.message }));
  }
}
process.exit(failed ? 1 : 0);
