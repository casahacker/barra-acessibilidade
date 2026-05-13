import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAccessibility } from "./useAccessibility";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = "";
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.style.fontSize = "";
});

describe("useAccessibility", () => {
  it("inicializa com defaults sensatos", () => {
    const { result } = renderHook(() => useAccessibility());
    expect(result.current.state.fontSize).toBe("normal");
    expect(result.current.state.dyslexia).toBe(false);
    expect(result.current.state.contrast).toBe(false);
  });

  it("toggle dispara classe CSS no html", () => {
    const { result } = renderHook(() => useAccessibility());
    act(() => {
      result.current.toggle("dyslexia");
    });
    expect(result.current.state.dyslexia).toBe(true);
    expect(document.documentElement.classList.contains("ch-a11y-dyslexia")).toBe(true);
  });

  it("persiste em localStorage com prefixo padrão", () => {
    const { result } = renderHook(() => useAccessibility());
    act(() => {
      result.current.toggle("dyslexia");
    });
    expect(localStorage.getItem("a11y-dyslexia")).toBe("true");
  });

  it("respeita storagePrefix customizado", () => {
    const { result } = renderHook(() => useAccessibility({ storagePrefix: "minhabarra-" }));
    act(() => {
      result.current.toggle("focusMode");
    });
    expect(localStorage.getItem("minhabarra-focus-mode")).toBe("true");
    expect(localStorage.getItem("a11y-focus-mode")).toBeNull();
  });

  it("respeita classPrefix customizado", () => {
    const { result } = renderHook(() => useAccessibility({ classPrefix: "a11y-" }));
    act(() => {
      result.current.toggle("dyslexia");
    });
    expect(document.documentElement.classList.contains("a11y-dyslexia")).toBe(true);
    expect(document.documentElement.classList.contains("ch-a11y-dyslexia")).toBe(false);
  });

  it("setFontSize muda fontSize no html", () => {
    const { result } = renderHook(() => useAccessibility());
    act(() => {
      result.current.setFontSize("large");
    });
    expect(result.current.state.fontSize).toBe("large");
    expect(document.documentElement.style.fontSize).toBe("18px");
  });

  it("setTheme aplica data-theme", () => {
    const { result } = renderHook(() => useAccessibility());
    act(() => {
      result.current.setTheme("dark");
    });
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("contrast remove data-theme e adiciona classe high-contrast", () => {
    const { result } = renderHook(() => useAccessibility());
    act(() => {
      result.current.toggle("contrast");
    });
    expect(document.documentElement.classList.contains("ch-a11y-high-contrast")).toBe(true);
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
  });

  it("carrega estado prévio do localStorage no mount", () => {
    localStorage.setItem("a11y-dyslexia", "true");
    localStorage.setItem("a11y-bigger-targets", "true");
    localStorage.setItem("a11y-font-size", "large");
    const { result } = renderHook(() => useAccessibility());
    expect(result.current.state.dyslexia).toBe(true);
    expect(result.current.state.biggerTargets).toBe(true);
    expect(result.current.state.fontSize).toBe("large");
  });
});
