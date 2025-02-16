import { renderHook, act } from "@testing-library/react";
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
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          data: [
            {
              user_id: "user123",
              verse_id: "verse1",
              verse_data: {
                id: "verse1",
                text: "Verse text",
                reference: "1:1",
              },
            },
          ],
          error: null,
        })),
      })),
      delete: vi.fn(() => ({ error: null })),
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

  it("debería añadir un favorito", async () => {
    const { result } = renderHook(() => useAddFavorite());
    const verse = { id: "verse1", text: "Verse text", reference: "1:1" };

    await act(async () => {
      await result.current.addFavorite(verse);
    });

    expect(result.current.favorites).toEqual([verse]);
  });
});
