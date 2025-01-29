import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  getBibles,
  getChapters,
  loadChapterVersesFromAPI,
} from "../services/getData";
import type { BibleBooks, Chapter, SearchResults, Verse} from "../types/index";
import { useSidebar } from "@/components/ui/sidebar";
import axios from "axios";
import { API_KEY, API_URL } from "@/constants/api";
import { useAddFavorite } from "@/Hooks/useAddFavorite";

const formatVerseText = (text: string) => {
  return text.toLowerCase().replace(/^([a-z])/, (match) => match.toUpperCase());
};

const isTitleOrHeading = (text: string) => {
  const titleKeywords = ["Capítulo", "Libro", "Título"];
  return titleKeywords.some((keyword) => text.includes(keyword));
};

interface BibleContextProps {
  bibleVerse: BibleBooks[];
  selectedBook: BibleBooks["id"];
  bibleVerseChapters: Chapter[];
  chapterVerses: Verse[];
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  handleBook: (bookId: string) => void;
  loadChapterVerses: (chapterId: string) => void;
  searchBibleVerse: (query: string) => void;
  toggleSidebar: () => void;
  searchResults: SearchResults | null;
  query: string;
  onClearSearch: () => void;
  favorites: Verse[];
  addFavorite: (verseId: string) => void;
  removeFavorite: (verseId: string) => void;
}

const BibleContext = createContext<BibleContextProps | undefined>(undefined);

interface BibleProviderProps {
  children: React.ReactNode;
}

export const BibleProvider: React.FC<BibleProviderProps> = ({ children }) => {
  const [bibleVerse, setBibleVerse] = useState<BibleBooks[]>([]);
  const [selectedBook, setSelectedBook] = useState<BibleBooks["id"]>("GEN");
  const [bibleVerseChapters, setBibleVerseChapters] = useState<Chapter[]>([]);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const { favorites, addFavorite, removeFavorite } = useAddFavorite();
  const [query, setQuery] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toggleSidebar } = useSidebar();

  const loadChapterVerses = async (chapterId: string) => {
    try {
      const response = await loadChapterVersesFromAPI(chapterId);
      if (response.data) {
        const content = response.data.content.replace(/<\/?[^>]+(>|$)/g, "");
        const versePattern = /(\d+)([^0-9]+)/g;
        const versesArray: Verse[] = [];
        let match;

        while ((match = versePattern.exec(content)) !== null) {
          const verseNumber = match[1];
          const verseText = formatVerseText(match[2].trim());

          if (!isTitleOrHeading(verseText)) {
            versesArray.push({
              id: `${chapterId}-${verseNumber}`,
              reference: `Versículo ${verseNumber}`,
              text: verseText,
            });
          }
        }
        setChapterVerses(versesArray);
      } else {
        console.error(
          "No se encontraron datos en la respuesta del API:",
          response
        );
      }
    } catch (error) {
      console.error("Error al cargar los versículos:", error);
    }
  };

  const onClearSearch = () => {
    setQuery("");
    setSearchResults(null);
  };

  const fetchData = async () => {
    try {
      const response = await getBibles();
      if (response?.data) {
        setBibleVerse(response.data);
      } else {
        console.error(
          "Estructura inesperada en la respuesta del API:",
          response
        );
      }
    } catch (error) {
      console.error("Error al obtener las biblias:", error);
    }
  };

  const loadChapters = async (bookId: string) => {
    try {
      const response = await getChapters(bookId);
      if (response?.data) {
        setBibleVerseChapters(response.data);
      } else {
        console.error(
          "Estructura inesperada en la respuesta del API:",
          response
        );
      }
    } catch (error) {
      console.error("Error al obtener los capítulos:", error);
    }
  };

  const searchBible = async (query: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/v1/bibles/592420522e16049f-01/search?`,
        {
          headers: {
            "api-key": API_KEY,
          },
          params: {
            query,
            limit: 10,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return null;
    }
  };

  const getVersesFromPassage = async (passageId: string) => {
    const [book, range] = passageId.split(".");
    const [startVerse, endVerse] = range
      .split("-")
      .map((v) => Number.parseInt(v.split(".")[1]));
    const verses: Verse[] = [];

    for (let verse = startVerse; verse <= endVerse; verse++) {
      try {
        const response = await axios.get(
          `${API_URL}/v1/bibles/592420522e16049f-01/verses/${book}.${verse}`,
          {
            headers: {
              "api-key": API_KEY,
            },
          }
        );
        const verseData = response.data.data;
        verses.push({
          id: verseData.id,
          reference: verseData.reference,
          text: verseData.text,
        });
      } catch (error) {
        console.error("Error fetching verse:", error);
      }
    }

    return verses;
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.trim()) {
        const data = await searchBible(query);
        if (data) {
          const passagesWithVerses = data.passages
            ? await Promise.all(
                data.passages.map(async (passage: { id: string }) => {
                  const verses = await getVersesFromPassage(passage.id);
                  return { ...passage, verses };
                })
              )
            : [];

          const verses = data.verses || [];
          setSearchResults({ ...data, passages: passagesWithVerses, verses });
        } else {
          setSearchResults(null);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBook) {
      loadChapters(selectedBook);
      loadChapterVerses(`${selectedBook}.1`);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (bibleVerseChapters.length > 0 && bibleVerseChapters[0].id) {
      loadChapterVerses(`${selectedBook}.1`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bibleVerseChapters]);

  const handleBook = (bookId: string) => {
    setSelectedBook(bookId);
    toggleSidebar();
  };

  return (
    <BibleContext.Provider
      value={{
        bibleVerse,
        selectedBook,
        bibleVerseChapters,
        chapterVerses,
        handleBook,
        loadChapterVerses,
        scrollAreaRef,
        toggleSidebar,
        searchResults,
        searchBibleVerse: setQuery,
        query,
        onClearSearch,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBible = (): BibleContextProps => {
  const context = useContext(BibleContext);
  if (!context) {
    throw new Error("useBible must be used within a BibleProvider");
  }
  return context;
};
