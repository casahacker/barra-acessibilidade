// Build IIFE — expõe `window.CasaHackerA11y.mount(opts?)`.
// Usa Preact via alias (react → preact/compat) pra economizar ~30KB.
//
// Uso:
//   <link rel="stylesheet" href="bar.css">
//   <script src="bar.iife.js" data-auto="true"></script>
// ou:
//   <script src="bar.iife.js"></script>
//   <script>CasaHackerA11y.mount({ enableVLibras: true });</script>

import { render, h } from "preact";
import { AccessibilityBar } from "@casahacker/accessibility-bar";
import type { AccessibilityBarOptions } from "@casahacker/accessibility-bar";

const ROOT_ID = "ch-a11y-root";

function ensureRoot(): HTMLElement {
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement("div");
    root.id = ROOT_ID;
    document.body.appendChild(root);
  }
  return root;
}

function mount(options: AccessibilityBarOptions = {}): void {
  const root = ensureRoot();
  render(h(AccessibilityBar as never, { options }), root);
}

function unmount(): void {
  const root = document.getElementById(ROOT_ID);
  if (root) render(null, root);
}

// Auto-mount opcional: <script src="bar.iife.js" data-auto="true">
const currentScript = (document.currentScript as HTMLScriptElement | null) ?? null;
if (currentScript?.dataset.auto === "true") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => mount());
  } else {
    mount();
  }
}

// API global.
const api = { mount, unmount };
(window as unknown as { CasaHackerA11y: typeof api }).CasaHackerA11y = api;

export default api;
