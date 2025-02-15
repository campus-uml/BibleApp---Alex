import { renderHook, act } from "@testing-library/react";
import { useScrollHeader } from "../../Hooks/useScrollHeader";
import { it, expect, describe } from "vitest";

global.scrollY = 0;

describe("useScrollHeader Hook", () => {
  it("should be initially visible", () => {
    const { result } = renderHook(() => useScrollHeader());
    expect(result.current).toBe(true);
  });

  it("debería ocultar el encabezado al desplazarse hacia abajo", () => {
    const { result } = renderHook(() => useScrollHeader());

    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 20,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(false);
  });

  it("debería mostrar el encabezado al desplazarse hacia arriba", () => {
    const { result } = renderHook(() => useScrollHeader());

    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 20,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 5,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });
});
