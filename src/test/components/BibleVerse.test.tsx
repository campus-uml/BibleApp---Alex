import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import BibleVerse from "../../components/BibleVerse"; // Adjust the import path accordingly
import { useBible } from "../../context/BIbleContext";
import { useActions } from "@/Hooks/useActions";

vi.mock("../../context/BIbleContext", () => ({
  useBible: vi.fn().mockReturnValue({
    bibleVerseChapters: [],
    chapterVerses: [],
    loadChapterVerses: vi.fn(),
    scrollAreaRef: null,
    selectedBook: "genesis",
    bibleVerse: [],
  }),
}));
vi.mock("@/Hooks/useActions", () => ({
  useActions: vi.fn(),
}));

describe("Pruebas en BibleVerse", () => {
  it("debería renderizar la lista de versículos de la Biblia cuando hay resultados de búsqueda disponibles", () => {
    const mockSearchResults = {
      verses: [
        {
          id: "1",
          text: "En el principio Dios creó los cielos y la tierra.",
          orgId: "1",
          bookId: "1",
          bibleId: "1",
          chapterId: "1",
        },
        {
          id: "2",
          text: "Y dijo Dios: Sea la luz; y fue la luz.",
          orgId: "2",
          bookId: "1",
          bibleId: "1",
          chapterId: "1",
        },
      ],
      length: 2,
      query: "genesis",
      limit: 10,
      offset: 0,
      total: 2,
      verseCount: 2,
      passages: [],
    };

    const mockClearSearch = vi.fn();
    const mockAddFavorite = vi.fn();
    const mockRemoveFavorite = vi.fn();
    const mockFavorites: {
      id: string;
      reference: string;
      text: string;
      orgId: string;
      bookId: string;
      bibleId: string;
      chapterId: string;
    }[] = [];

    (useBible as Mock).mockReturnValue({
      bibleVerseChapters: [],
      chapterVerses: [],
      loadChapterVerses: vi.fn(),
      scrollAreaRef: null,
      selectedBook: "genesis",
      bibleVerse: [],
    });
    (useActions as Mock).mockReturnValue({
      copyToClipboard: vi.fn(),
      shareToWhatsApp: vi.fn(),
    });

    render(
      <BibleVerse
        searchResults={mockSearchResults}
        onClearSearch={mockClearSearch}
        addFavorite={mockAddFavorite}
        removeFavorite={mockRemoveFavorite}
        favorites={mockFavorites}
      />
    );

    expect(screen.getByText("Resultados de búsqueda")).toBeInTheDocument();
  });


  
});
