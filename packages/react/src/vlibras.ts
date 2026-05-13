// #312 — Lazy-loader do widget VLibras (governo BR).
//
// VLibras é DOM-driven; não há API JS pública pra abrir/fechar o player.
// A integração:
//   1. ensureDom() injeta o markup `<div vw>...</div>` esperado pelo script.
//   2. loadScript() injeta o `<script>` oficial e cacheia a Promise.
//   3. openVLibras() instancia `new window.VLibras.Widget(appUrl)` (1x) e
//      dispara click programático no botão de acesso.
//   4. closeVLibras() dispara click no `.vp-btn-close` interno.
//
// Licença do VLibras: LGPL v3 (Copyright Secretaria de Governo Digital + UFPB).

declare global {
  interface Window {
    VLibras?: {
      Widget: new (appUrl: string) => unknown;
    };
    __chA11yVlibrasWidget?: unknown;
    __chA11yVlibrasScriptPromise?: Promise<void>;
  }
}

const DEFAULT_APP_URL = "https://vlibras.gov.br/app";
const DEFAULT_PLUGIN_URL = "https://vlibras.gov.br/app/vlibras-plugin.js";

function ensureDom(): void {
  if (typeof document === "undefined") return;
  if (document.querySelector("[vw]")) return;
  const wrapper = document.createElement("div");
  wrapper.setAttribute("vw", "");
  wrapper.className = "enabled";
  wrapper.innerHTML =
    '<div vw-access-button class="active"></div>' +
    '<div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
  document.body.appendChild(wrapper);
}

function loadScript(pluginUrl = DEFAULT_PLUGIN_URL): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.__chA11yVlibrasScriptPromise) {
    return window.__chA11yVlibrasScriptPromise;
  }
  window.__chA11yVlibrasScriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = pluginUrl;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`VLibras: falha ao carregar ${pluginUrl}`));
    document.head.appendChild(s);
  });
  return window.__chA11yVlibrasScriptPromise;
}

export async function openVLibras(opts: { appUrl?: string; pluginUrl?: string } = {}): Promise<void> {
  if (typeof window === "undefined") return;
  ensureDom();
  try {
    await loadScript(opts.pluginUrl);
  } catch (err) {
    console.error("[ch-a11y]", err);
    return;
  }
  if (!window.__chA11yVlibrasWidget && window.VLibras?.Widget) {
    try {
      window.__chA11yVlibrasWidget = new window.VLibras.Widget(opts.appUrl ?? DEFAULT_APP_URL);
    } catch (err) {
      console.error("[ch-a11y] VLibras.Widget falhou:", err);
      return;
    }
  }
  // O widget cria o botão DOM-driven; clicar nele expande o player.
  // Pequeno setTimeout pra dar tempo do widget popular o DOM após instanciar.
  setTimeout(() => {
    const btn = document.querySelector<HTMLElement>("[vw-access-button]");
    btn?.click();
  }, 100);
}

export function closeVLibras(): void {
  if (typeof document === "undefined") return;
  const closeBtn = document.querySelector<HTMLElement>(".vp-btn-close");
  closeBtn?.click();
}

export function isVLibrasOpen(): boolean {
  if (typeof document === "undefined") return false;
  return !!document.querySelector(".vpw-container.vpw-active");
}
