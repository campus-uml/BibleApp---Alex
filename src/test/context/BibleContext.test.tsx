import { renderHook, act } from "@testing-library/react-hooks";
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

  it("debería cargar capítulos cuando se selecciona un libro", async () => {
    const mockChapters = [{ id: "chapter1", number: "1" }];
    vi.mocked(getData.getChapters).mockResolvedValue({ data: mockChapters });
    vi.mocked(getData.loadChapterVersesFromAPI).mockResolvedValue({
      data: { content: "1 Verse text" },
    });

    const { result, waitForNextUpdate } = renderHook(() => useBible(), {
      wrapper: BibleProvider,
    });

    act(() => {
      result.current.handleBook("book1");
    });

    await waitForNextUpdate();

    expect(result.current.bibleVerseChapters).toEqual(mockChapters);
    expect(result.current.selectedBook).toBe("book1");
  });

  it("debería limpiar los resultados de búsqueda", () => {
    const { result } = renderHook(() => useBible(), {
      wrapper: BibleProvider,
    });

    act(() => {
      result.current.searchBibleVerse("search query");
    });

    act(() => {
      result.current.onClearSearch();
    });

    expect(result.current.searchResults).toBeNull();
    expect(result.current.query).toBe("");
  });
});
