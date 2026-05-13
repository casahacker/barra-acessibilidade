// Tipos públicos da biblioteca.

export type Theme = "light" | "dark";
export type FontSize = "small" | "normal" | "large";

export interface State {
  theme: Theme;
  contrast: boolean;
  fontSize: FontSize;
  dyslexia: boolean;
  bigCursor: boolean;
  focusMode: boolean;
  readingRuler: boolean;
  noMotion: boolean;
  highlightFocus: boolean;
  biggerTargets: boolean;
  underlineLinks: boolean;
}

export type BooleanKey = {
  [K in keyof State]: State[K] extends boolean ? K : never;
}[keyof State];

/**
 * Opções pra customizar a barra. Todas opcionais — defaults sensatos.
 */
export interface AccessibilityBarOptions {
  /**
   * Prefixo das chaves no localStorage. Default `"a11y-"`.
   * Use `"ch-a11y-"` em projetos novos pra evitar colisão.
   */
  storagePrefix?: string;
  /**
   * Prefixo das classes CSS aplicadas em `<html>`. Default `"ch-a11y-"`.
   * Use `"a11y-"` pra compat com instalações legadas.
   */
  classPrefix?: string;
  /**
   * URL do CSS da fonte dyslexia-friendly (lazy-loaded quando ativada).
   * Default: Google Fonts Atkinson Hyperlegible.
   */
  dyslexiaFontUrl?: string;
  /**
   * Habilita o botão de VLibras (carrega o widget on-demand quando clicado).
   * Default `true`.
   */
  enableVLibras?: boolean;
  /**
   * Label do botão Libras. Default `"Libras"`.
   */
  vlibrasLabel?: string;
  /**
   * URL base do widget VLibras. Default `"https://vlibras.gov.br/app"`.
   * Útil pra apontar pra um mirror próprio em ambientes offline-first.
   */
  vlibrasAppUrl?: string;
}
