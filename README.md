# barra-acessibilidade

Barra fixa de acessibilidade da **Casa Hacker** — 12 features WCAG-aligned + integração VLibras (governo BR). Doação ao ecossistema brasileiro de acessibilidade web.

[![License: Casa Hacker](https://img.shields.io/badge/license-Casa%20Hacker-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@casahacker/accessibility-bar.svg)](https://www.npmjs.com/package/@casahacker/accessibility-bar)

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

### React (npm)

```bash
npm install @casahacker/accessibility-bar
# ou: pnpm add @casahacker/accessibility-bar
```

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

### Standalone (script tag)

```html
<link rel="stylesheet" href="bar.css">
<script src="bar.iife.js" data-auto="true"></script>
```

Ou inicialização manual:

```html
<script src="bar.iife.js"></script>
<script>
  CasaHackerA11y.mount({ enableVLibras: true });
</script>
```

### WordPress

Baixe o `.zip` do plugin na [última release](https://github.com/casahacker/barra-acessibilidade/releases) (tag `wp-v*`) e instale via **Plugins → Adicionar Novo → Enviar Plugin**. Configure em **Configurações → Acessibilidade**.

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

Hook standalone — útil pra construir UI customizada sem a barra:

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

Releases:
- `git tag v0.1.0 && git push --tags` → publica no npm
- `git tag wp-v0.1.0 && git push --tags` → gera zip do plugin WP

## Licença

Casa Hacker License (ver [LICENSE](LICENSE)). Copyright (c) 2026 Casa Hacker.
