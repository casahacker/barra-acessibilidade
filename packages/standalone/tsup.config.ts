import { defineConfig } from "tsup";
import { copyFileSync } from "node:fs";

export default defineConfig({
  entry: { bar: "src/bar.ts" },
  format: ["iife"],
  globalName: "CasaHackerA11y",
  outExtension: () => ({ js: ".iife.js" }),
  minify: true,
  target: "es2019",
  clean: true,
  sourcemap: false,
  // Bundle TUDO (Preact + React-aliasado + componente) num único arquivo.
  noExternal: [/.*/],
  esbuildOptions(opts) {
    opts.alias = {
      ...opts.alias,
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
      "react/jsx-dev-runtime": "preact/jsx-dev-runtime",
    };
  },
  onSuccess: async () => {
    // CSS é o mesmo do pacote React — copiar pra acompanhar o IIFE.
    copyFileSync("../react/src/styles/bar.css", "dist/bar.css");
  },
});
