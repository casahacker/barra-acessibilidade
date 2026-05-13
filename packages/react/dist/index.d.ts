import * as react_jsx_runtime from 'react/jsx-runtime';

type Theme = "light" | "dark";
type FontSize = "small" | "normal" | "large";
interface State {
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
type BooleanKey = {
    [K in keyof State]: State[K] extends boolean ? K : never;
}[keyof State];
/**
 * Opções pra customizar a barra. Todas opcionais — defaults sensatos.
 */
interface AccessibilityBarOptions {
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

interface AccessibilityBarProps {
    options?: AccessibilityBarOptions;
}
declare function AccessibilityBar({ options }: AccessibilityBarProps): react_jsx_runtime.JSX.Element;

interface UseAccessibilityReturn {
    state: State;
    toggle: (key: BooleanKey) => void;
    update: <K extends keyof State>(key: K, value: State[K]) => void;
    setTheme: (theme: Theme) => void;
    setFontSize: (size: FontSize) => void;
}
/**
 * Hook que gerencia state da barra de acessibilidade.
 * Aplica classes CSS em `<html>` e persiste em localStorage.
 *
 * Pode ser usado sem o componente `<AccessibilityBar>` pra construir UI custom.
 */
declare function useAccessibility(opts?: AccessibilityBarOptions): UseAccessibilityReturn;

declare global {
    interface Window {
        VLibras?: {
            Widget: new (appUrl: string) => unknown;
        };
        __chA11yVlibrasWidget?: unknown;
        __chA11yVlibrasScriptPromise?: Promise<void>;
    }
}
declare function openVLibras(opts?: {
    appUrl?: string;
    pluginUrl?: string;
}): Promise<void>;
declare function closeVLibras(): void;
declare function isVLibrasOpen(): boolean;

export { AccessibilityBar, type AccessibilityBarOptions, type AccessibilityBarProps, type BooleanKey, type FontSize, type State, type Theme, type UseAccessibilityReturn, closeVLibras, isVLibrasOpen, openVLibras, useAccessibility };
