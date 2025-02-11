import { renderHook } from "@testing-library/react-hooks";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { BibleProvider, useBible } from "../../context/BIbleContext";
import * as getData from "../../services/getData";

vi.mock("../../services/getData", () => ({
  getBibles: vi.fn(),
  getChapters: vi.fn(),
  loadChapterVersesFromAPI: vi.fn(),
  getRamdonPassage: vi.fn(),
}));

vi.mock("axios");

vi.mock("@/components/ui/sidebar", () => ({
  useSidebar: () => ({ toggleSidebar: vi.fn() }),
}));

vi.mock("@/Hooks/useAddFavorite", () => ({
  useAddFavorite: () => ({
    favorites: [],
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  }),
}));

describe("useBible", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería obtener datos de la Biblia al montar", async () => {
    const mockBibles = [{ id: "bible1", name: "Bible 1" }];
    vi.mocked(getData.getBibles).mockResolvedValue({ data: mockBibles });

    const { result, waitForNextUpdate } = renderHook(() => useBible(), {
      wrapper: BibleProvider,
    });

    await waitForNextUpdate();

    expect(result.current.bibleVerse).toEqual(mockBibles);
  });

 
});
