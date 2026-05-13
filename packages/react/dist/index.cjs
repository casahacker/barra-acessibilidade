"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AccessibilityBar: () => AccessibilityBar,
  closeVLibras: () => closeVLibras,
  isVLibrasOpen: () => isVLibrasOpen,
  openVLibras: () => openVLibras,
  useAccessibility: () => useAccessibility
});
module.exports = __toCommonJS(index_exports);

// src/AccessibilityBar.tsx
var import_react2 = require("react");

// src/useAccessibility.ts
var import_react = require("react");
var DEFAULT_DYSLEXIA_FONT = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap";
var STATE_DEFAULT = {
  theme: "light",
  contrast: false,
  fontSize: "normal",
  dyslexia: false,
  bigCursor: false,
  focusMode: false,
  readingRuler: false,
  noMotion: false,
  highlightFocus: false,
  biggerTargets: false,
  underlineLinks: false
};
var STATE_KEYS = {
  theme: "theme",
  contrast: "contrast",
  fontSize: "font-size",
  dyslexia: "dyslexia",
  bigCursor: "big-cursor",
  focusMode: "focus-mode",
  readingRuler: "reading-ruler",
  noMotion: "no-motion",
  highlightFocus: "highlight-focus",
  biggerTargets: "bigger-targets",
  underlineLinks: "underline-links"
};
function storageKey(prefix, k) {
  return `${prefix}${STATE_KEYS[k]}`;
}
function loadInitial(storagePrefix) {
  if (typeof window === "undefined") return { ...STATE_DEFAULT };
  const get = (k, fallback) => {
    const v = window.localStorage?.getItem(storageKey(storagePrefix, k));
    if (v === null || v === void 0) return fallback;
    if (typeof fallback === "boolean") return v === "true";
    return v;
  };
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  return {
    theme: get("theme", prefersDark ? "dark" : "light"),
    contrast: get("contrast", false),
    fontSize: get("fontSize", "normal"),
    dyslexia: get("dyslexia", false),
    bigCursor: get("bigCursor", false),
    focusMode: get("focusMode", false),
    readingRuler: get("readingRuler", false),
    noMotion: get("noMotion", prefersReducedMotion),
    highlightFocus: get("highlightFocus", false),
    biggerTargets: get("biggerTargets", false),
    underlineLinks: get("underlineLinks", false)
  };
}
function persist(storagePrefix, s) {
  if (typeof window === "undefined" || !window.localStorage) return;
  for (const k of Object.keys(STATE_KEYS)) {
    window.localStorage.setItem(storageKey(storagePrefix, k), String(s[k]));
  }
}
function applyA11y(s, classPrefix, dyslexiaFontUrl) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  if (s.contrast) {
    html.classList.add(`${classPrefix}high-contrast`);
    html.removeAttribute("data-theme");
  } else {
    html.classList.remove(`${classPrefix}high-contrast`);
    html.setAttribute("data-theme", s.theme);
  }
  html.style.fontSize = s.fontSize === "small" ? "14px" : s.fontSize === "large" ? "18px" : "16px";
  const toggle = (name, on) => html.classList.toggle(`${classPrefix}${name}`, on);
  toggle("dyslexia", s.dyslexia);
  toggle("big-cursor", s.bigCursor);
  toggle("focus-mode", s.focusMode);
  toggle("reading-ruler", s.readingRuler);
  toggle("no-motion", s.noMotion);
  toggle("highlight-focus", s.highlightFocus);
  toggle("bigger-targets", s.biggerTargets);
  toggle("underline-links", s.underlineLinks);
  if (s.dyslexia && !document.getElementById("ch-a11y-dyslexia-font")) {
    const link = document.createElement("link");
    link.id = "ch-a11y-dyslexia-font";
    link.rel = "stylesheet";
    link.href = dyslexiaFontUrl;
    document.head.appendChild(link);
  }
}
function useAccessibility(opts = {}) {
  const storagePrefix = opts.storagePrefix ?? "a11y-";
  const classPrefix = opts.classPrefix ?? "ch-a11y-";
  const dyslexiaFontUrl = opts.dyslexiaFontUrl ?? DEFAULT_DYSLEXIA_FONT;
  const [state, setState] = (0, import_react.useState)(STATE_DEFAULT);
  const mountedRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const init = loadInitial(storagePrefix);
    setState(init);
    applyA11y(init, classPrefix, dyslexiaFontUrl);
  }, [storagePrefix, classPrefix, dyslexiaFontUrl]);
  (0, import_react.useEffect)(() => {
    if (!mountedRef.current) return;
    applyA11y(state, classPrefix, dyslexiaFontUrl);
    persist(storagePrefix, state);
  }, [state, storagePrefix, classPrefix, dyslexiaFontUrl]);
  return {
    state,
    toggle: (key) => setState((s) => ({ ...s, [key]: !s[key] })),
    update: (key, value) => setState((s) => ({ ...s, [key]: value })),
    setTheme: (theme) => setState((s) => ({ ...s, theme })),
    setFontSize: (fontSize) => setState((s) => ({ ...s, fontSize }))
  };
}

// src/vlibras.ts
var DEFAULT_APP_URL = "https://vlibras.gov.br/app";
var DEFAULT_PLUGIN_URL = "https://vlibras.gov.br/app/vlibras-plugin.js";
function ensureDom() {
  if (typeof document === "undefined") return;
  if (document.querySelector("[vw]")) return;
  const wrapper = document.createElement("div");
  wrapper.setAttribute("vw", "");
  wrapper.className = "enabled";
  wrapper.innerHTML = '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
  document.body.appendChild(wrapper);
}
function loadScript(pluginUrl = DEFAULT_PLUGIN_URL) {
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
async function openVLibras(opts = {}) {
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
  setTimeout(() => {
    const btn = document.querySelector("[vw-access-button]");
    btn?.click();
  }, 100);
}
function closeVLibras() {
  if (typeof document === "undefined") return;
  const closeBtn = document.querySelector(".vp-btn-close");
  closeBtn?.click();
}
function isVLibrasOpen() {
  if (typeof document === "undefined") return false;
  return !!document.querySelector(".vpw-container.vpw-active");
}

// src/icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var base = (props) => ({
  width: props.width ?? 11,
  height: props.height ?? 11,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...props
});
var IconAccessibility = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "9" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 16.5l2-3 2 3m-2-3v-2l3-1m-6 0l3 1" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "7.5", r: ".5", fill: "currentColor" })
] });
var IconSun = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "4" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" })
] });
var IconMoon = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(p), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }) });
var IconContrast = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 18a6 6 0 0 0 0-12v12z", fill: "currentColor" })
] });
var IconBookOpen = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(p), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" }) });
var IconRuler = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(p), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "5", y1: "12", x2: "19", y2: "12" }) });
var IconFocus = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "3" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" })
] });
var IconCursor = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 13l6 6" })
] });
var IconMore = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "5", cy: "12", r: "1", fill: "currentColor" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "19", cy: "12", r: "1", fill: "currentColor" })
] });
var IconPause = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "4", width: "4", height: "16" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "14", y: "4", width: "4", height: "16" })
] });
var IconHand = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(p), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.7-2.4l-3.5-4.5a2 2 0 0 1 2.8-2.8L8 16V6" }) });
var IconUnderline = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 4v6a6 6 0 0 0 12 0V4" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "4", y1: "20", x2: "20", y2: "20" })
] });
var IconLibras = (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(p), children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V4a1.5 1.5 0 0 1 3 0v5" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 9V3a1.5 1.5 0 0 1 3 0v6" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 9V4a1.5 1.5 0 0 1 3 0v9c0 3-2 6-5 6s-5-2-5-5v-3" })
] });

// src/AccessibilityBar.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function AccessibilityBar({ options = {} }) {
  const { state, toggle, update } = useAccessibility(options);
  const [moreOpen, setMoreOpen] = (0, import_react2.useState)(false);
  const [librasOpen, setLibrasOpen] = (0, import_react2.useState)(false);
  const enableVLibras = options.enableVLibras !== false;
  const vlibrasLabel = options.vlibrasLabel ?? "Libras";
  const rulerRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (!state.readingRuler) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (rulerRef.current) rulerRef.current.style.top = `${e.clientY}px`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [state.readingRuler]);
  const handleLibras = () => {
    if (librasOpen) {
      closeVLibras();
      setLibrasOpen(false);
    } else {
      void openVLibras({
        appUrl: options.vlibrasAppUrl
      });
      setLibrasOpen(true);
    }
  };
  const toggleBtn = (key, icon, label) => {
    const active = !!state[key];
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => toggle(key),
        className: `ch-a11y-btn${active ? " ch-a11y-btn--active" : ""}`,
        "aria-pressed": active,
        title: label,
        children: [
          icon,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-btn__label", children: label })
        ]
      }
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    state.readingRuler && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: rulerRef, "aria-hidden": "true", className: "ch-a11y-ruler", style: { top: 0 } }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { role: "region", "aria-label": "Barra de acessibilidade", className: "ch-a11y-bar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "ch-a11y-brand", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconAccessibility, { width: 14, height: 14 }),
        "Acessibilidade"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-divider" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-section-label", children: "Tema" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          type: "button",
          onClick: () => update("theme", "light"),
          className: `ch-a11y-btn${!state.contrast && state.theme === "light" ? " ch-a11y-btn--active" : ""}`,
          "aria-pressed": !state.contrast && state.theme === "light",
          title: "Tema claro",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconSun, {}),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-btn__label ch-a11y-btn__label--md", children: "Claro" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          type: "button",
          onClick: () => update("theme", "dark"),
          className: `ch-a11y-btn${!state.contrast && state.theme === "dark" ? " ch-a11y-btn--active" : ""}`,
          "aria-pressed": !state.contrast && state.theme === "dark",
          title: "Tema escuro",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconMoon, {}),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-btn__label ch-a11y-btn__label--md", children: "Escuro" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          type: "button",
          onClick: () => toggle("contrast"),
          className: `ch-a11y-btn${state.contrast ? " ch-a11y-btn--active" : ""}`,
          "aria-pressed": state.contrast,
          title: "Alto contraste",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconContrast, {}),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-btn__label ch-a11y-btn__label--md", children: "Alto Contraste" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-divider" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-section-label", children: "Fonte" }),
      [
        ["small", "A\u2212"],
        ["normal", "A"],
        ["large", "A+"]
      ].map(([size, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          onClick: () => update("fontSize", size),
          className: `ch-a11y-btn ch-a11y-btn--font-${size}${state.fontSize === size ? " ch-a11y-btn--active" : ""}`,
          "aria-pressed": state.fontSize === size,
          title: `Fonte ${label}`,
          children: label
        },
        size
      )),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-divider" }),
      toggleBtn("dyslexia", /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconBookOpen, {}), "Dislexia"),
      toggleBtn("readingRuler", /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconRuler, {}), "R\xE9gua"),
      toggleBtn("focusMode", /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconFocus, {}), "Foco"),
      toggleBtn("bigCursor", /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconCursor, {}), "Cursor +"),
      enableVLibras && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          type: "button",
          onClick: handleLibras,
          className: `ch-a11y-btn${librasOpen ? " ch-a11y-btn--active" : ""}`,
          "aria-pressed": librasOpen,
          title: "Tradutor de Libras (VLibras)",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconLibras, {}),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-btn__label", children: vlibrasLabel })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          type: "button",
          onClick: () => setMoreOpen((o) => !o),
          "aria-expanded": moreOpen,
          className: "ch-a11y-btn",
          title: "Mais op\xE7\xF5es",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconMore, {}),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ch-a11y-btn__label ch-a11y-btn__label--md", children: "Mais" })
          ]
        }
      ),
      moreOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        toggleBtn("noMotion", /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPause, {}), "Sem anima\xE7\xE3o"),
        toggleBtn("highlightFocus", /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconFocus, {}), "Foco real\xE7ado"),
        toggleBtn("biggerTargets", /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconHand, {}), "Cliques +"),
        toggleBtn("underlineLinks", /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconUnderline, {}), "Sublinhar links")
      ] })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccessibilityBar,
  closeVLibras,
  isVLibrasOpen,
  openVLibras,
  useAccessibility
});
//# sourceMappingURL=index.cjs.map