# barra-acessibilidade

Barra fixa de acessibilidade da **Casa Hacker** — 12 features WCAG-aligned + integração VLibras (governo BR). Doação ao ecossistema brasileiro de acessibilidade web.

[![License: Casa Hacker](https://img.shields.io/badge/license-Casa%20Hacker-blue.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/release/casahacker/barra-acessibilidade)](https://github.com/casahacker/barra-acessibilidade/releases/latest)

> **Sem npm registry.** A distribuição é feita via **GitHub Releases** + **jsDelivr CDN**. Sem token, sem 2FA, sem scope reservado. Mais simples de manter e contribuir.

## Features

- 🎨 **Tema** — claro / escuro / alto contraste
- 🔠 **Fonte** — pequena / normal / grande (14px / 16px / 18px)
- 📖 **Dislexia** — Atkinson Hyperlegible (lazy-loaded do Google Fonts)
- 📏 **Régua de leitura** — barra horizontal seguindo o cursor
- 🎯 **Modo foco** — escurece header/aside/footer/nav
- 🖱️ **Cursor ampliado** — SVG 32×32 com contorno
- 🤟 **Libras** — integra o widget oficial VLibras (lazy-load on-demand)
- ⏸️ **Sem animação** — pausa todas transitions/animations
- 🟠 **Foco realçado** — outline 3px laranja persistente
- 👆 **Alvos maiores** — botões com 44×44px (WCAG 2.5.8)
- 🔗 **Sublinhar links**

## Instalação

### Script tag — CDN via jsDelivr (recomendado pra sites estáticos)

Pegue a [última versão](https://github.com/casahacker/barra-acessibilidade/releases/latest) e use a tag no URL:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/casahacker/barra-acessibilidade@v0.1.0/packages/standalone/dist/bar.css">
<script src="https://cdn.jsdelivr.net/gh/casahacker/barra-acessibilidade@v0.1.0/packages/standalone/dist/bar.iife.js" data-auto="true"></script>
```

Bundle: **~30KB minified / ~11KB gzipped**. Cache global do jsDelivr.

### React / Vite / Next.js — via tarball do GitHub Release

```bash
npm install https://github.com/casahacker/barra-acessibilidade/releases/download/v0.1.0/accessibility-bar-v0.1.0.tgz
# ou pnpm/yarn — todos suportam URL como dep
```

No `package.json`:
```json
{
  "dependencies": {
    "@casahacker/accessibility-bar": "https://github.com/casahacker/barra-acessibilidade/releases/download/v0.1.0/accessibility-bar-v0.1.0.tgz"
  }
}
```

Uso:
```tsx
import { AccessibilityBar } from "@casahacker/accessibility-bar";
import "@casahacker/accessibility-bar/styles.css";

function App() {
  return (
    <>
      <AccessibilityBar />
      <main style={{ paddingTop: 48 }}>...</main>
    </>
  );
}
```

### WordPress

1. Baixe `casa-hacker-a11y.zip` da [última release](https://github.com/casahacker/barra-acessibilidade/releases/latest)
2. WordPress Admin → **Plugins → Adicionar Novo → Enviar Plugin** → escolha o zip
3. Ative o plugin
4. Configure em **Configurações → Acessibilidade**

## API

### `<AccessibilityBar options={...} />`

```ts
interface AccessibilityBarOptions {
  storagePrefix?: string;     // default "a11y-"
  classPrefix?: string;       // default "ch-a11y-"
  dyslexiaFontUrl?: string;   // default Atkinson Hyperlegible CDN
  enableVLibras?: boolean;    // default true
  vlibrasLabel?: string;      // default "Libras"
  vlibrasAppUrl?: string;     // default "https://vlibras.gov.br/app"
}
```

### `useAccessibility(options?)`

Hook standalone pra construir UI customizada sem usar a barra:

```tsx
const { state, toggle, update, setTheme, setFontSize } = useAccessibility();
```

### VLibras helpers

```ts
import { openVLibras, closeVLibras, isVLibrasOpen } from "@casahacker/accessibility-bar";
```

## Customização visual

Sobrescreva classes CSS no seu app:

```css
.ch-a11y-bar {
  background: #1a1a1a;
  height: 40px;
}
.ch-a11y-btn--active {
  background: #d62828;
}
```

## Sobre o VLibras

O widget VLibras é mantido pela **Secretaria de Governo Digital (Brasil)** + **Universidade Federal da Paraíba**, sob licença **LGPL v3**. Este pacote apenas faz lazy-load do script oficial em `vlibras.gov.br/app/vlibras-plugin.js` quando o usuário clica no botão Libras.

Branding obrigatório: ao acionar o widget, o botão e avatar exibidos seguem o manual de identidade visual gov.br.

## Desenvolvimento

```bash
git clone https://github.com/casahacker/barra-acessibilidade
cd barra-acessibilidade
pnpm install
pnpm -r build
pnpm --filter vite-react dev
# abre playground em http://localhost:5173
```

### Como fazer uma release

Repositório → **Actions** → workflow **Release** → **Run workflow** → preencher `version` (ex `0.1.0`).

O workflow automaticamente:
1. Builda os pacotes React e standalone
2. Atualiza version em todos os `package.json` e no PHP do plugin
3. Commita o `dist/` no main (necessário pra jsDelivr servir via tag)
4. Cria a tag `v<version>`
5. Gera tarball npm + zip do plugin WP
6. Cria GitHub Release com 4 assets:
   - `accessibility-bar-v<version>.tgz` — tarball pra React/npm install
   - `casa-hacker-a11y.zip` — plugin WordPress
   - `bar.iife.js` + `bar.css` — standalone

## Licença

Casa Hacker License (ver [LICENSE](LICENSE)). Copyright (c) 2026 Casa Hacker.
