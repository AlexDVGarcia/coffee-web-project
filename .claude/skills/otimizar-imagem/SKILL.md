---
name: otimizar-imagem
description: Baixa uma foto de uma URL (Pexels, Wikimedia Commons ou outro banco de imagens), redimensiona para o tamanho de uso no site e converte para WebP em public/images, para a ADVG Coffee servir a imagem localmente. Use sempre que for adicionar ou trocar uma foto do site, trazer uma imagem externa para o projeto, converter imagens para webp ou reduzir o peso das fotos.
---

# Otimizar imagem

O site serve todas as fotos de `public/images/`, sem buscar nada em serviço externo. Esta skill traz uma foto nova para lá já no tamanho certo e em WebP.

## Script

Rode da raiz do projeto (usa `sharp`, que está nas devDependencies):

```bash
# uma imagem
node .claude/skills/otimizar-imagem/scripts/otimizar-imagem.mjs <url> public/images/menu/<slug>.webp --width 1200

# várias de uma vez
node .claude/skills/otimizar-imagem/scripts/otimizar-imagem.mjs --manifest lote.json
```

- O manifesto é um array `[{ "url": "...", "out": "public/images/...webp", "width": 1200 }]`. Guarde-o no scratchpad, não no projeto.
- `--quality` vale 80 por padrão. `--width` vale 1600 e só reduz: imagem menor que isso não é ampliada.
- A saída precisa estar dentro de `public/` e terminar em `.webp`.
- Cada imagem imprime uma linha JSON `{ out, src, width, height, bytes }`. Use `width`/`height` reais dessa linha no `lib/images.ts`.
- Sai com código 1 se alguma imagem falhar, mas processa as demais.

## Larguras por uso

| Uso | Pasta | `--width` |
| --- | --- | --- |
| Foto de item do cardápio (`MenuItemCard`) | `public/images/menu/` | 1200 |
| Painéis do /sobre, eventos | `public/images/site/` | 1600 |
| Hero de tela cheia | `public/images/site/` | 2400 |

## Pegando a URL original (maior resolução)

- **Pexels**: `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`, em que `{id}` é o número no fim da URL da página da foto.
- **Wikimedia Commons**: `https://commons.wikimedia.org/wiki/Special:FilePath/{arquivo}`, com o nome do arquivo depois de `File:`. O script já manda o User-Agent que o Wikimedia exige.
- Outros bancos: use o link de download do arquivo original, não a miniatura da página.

## Depois de gerar o arquivo

1. Registre a foto em `lib/images.ts` com `src`, `width` e `height` da saída do script, `alt` descrevendo a cena e `credit` (`pexels(id)` ou `commons(...)`).
2. Adicione uma linha em `public/images/CREDITS.md`. Wikimedia exige autor e licença; o crédito aparece em `/cardapio#creditos`.
3. Se substituiu um arquivo, apague o antigo e procure referências a ele (`grep` em `app/`, `lib/`).
4. Exiba sempre com `next/image` e `sizes` correto.

## Que foto escolher

Siga `docs/design/style-guide.md` (seção Fotografia): luz natural quente, sombras profundas, tons âmbar e marrom, enquadramento próximo, pessoas em movimento. Não use grãos de café sobre fundo branco nem latte art vista de cima em mesa de madeira genérica.
