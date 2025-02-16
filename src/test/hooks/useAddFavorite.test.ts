import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { describe, beforeEach, it, expect, Mock } from "vitest";
import { useAddFavorite } from "../../Hooks/useAddFavorite";
import { useAuth } from "../../context/AuthContext";

vi.mock("@/constants/api", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({ data: [], error: null })),
      })),
      insert: vi.fn(),
      delete: vi.fn(),
    })),
  },
}));

vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("Pruebas en useAddFavorite", () => {
  const mockUser = { id: "user123" };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as Mock).mockReturnValue({ user: mockUser });
  });

  it("debería comenzar con una lista de favoritos vacía", () => {
    const { result } = renderHook(() => useAddFavorite());
    expect(result.current.favorites).toEqual([]);
  });
});
