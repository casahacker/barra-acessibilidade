import { defineConfig } from "tsup";
import { copyFileSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".cjs" };
  },
  onSuccess: async () => {
    // Copia o CSS pro dist/ pra que `import "@casahacker/accessibility-bar/styles.css"` funcione.
    copyFileSync("src/styles/bar.css", "dist/bar.css");
  },
});
