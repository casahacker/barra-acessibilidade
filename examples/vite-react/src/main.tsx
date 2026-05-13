import React from "react";
import ReactDOM from "react-dom/client";
import { AccessibilityBar } from "@casahacker/accessibility-bar";
import "@casahacker/accessibility-bar/styles.css";

function App() {
  return (
    <div style={{ paddingTop: 48, fontFamily: "system-ui", padding: "48px 24px 24px" }}>
      <AccessibilityBar />
      <h1>Playground — Barra de Acessibilidade Casa Hacker</h1>
      <p>
        Esta página testa todos os toggles. Use a barra no topo. Suas preferências
        persistem em <code>localStorage</code> (chaves <code>a11y-*</code>).
      </p>
      <h2>Lorem Ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum nulla,
        bibendum eget porta quis, semper vel justo. Nulla facilisi.
      </p>
      <a href="https://github.com/casahacker/barra-acessibilidade">
        Repositório no GitHub
      </a>
      <p style={{ marginTop: 24 }}>
        <button
          type="button"
          onClick={() => alert("Botão padrão")}
          style={{ padding: "8px 16px" }}
        >
          Botão de exemplo
        </button>
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
