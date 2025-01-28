import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getBibles,
  getChapters,
  loadChapterVersesFromAPI,
  searchBible,
} from "../services/getData";
import { BibleBooks, Chapter, Verse } from "../types/index";
import { useSidebar } from "@/components/ui/sidebar";

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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBook) {
      loadChapters(selectedBook);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (bibleVerseChapters.length > 0) {
      loadChapterVerses(bibleVerseChapters[0].id);
    }
  }, [bibleVerseChapters]);

  const loadChapterVerses = async (chapterId: string) => {
    try {
      const response = await loadChapterVersesFromAPI(chapterId);
      if (!response.data) {
        console.error(
          "Error: No se encontró contenido en los versículos",
          response
        );
        return;
      }

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
    } catch (error) {
      console.error("Error fetching chapter content:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getBibles();
      if (response && response.data) {
        setBibleVerse(response.data);
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching bibles:", error);
    }
  };

  const handleBook = (bookId: string) => {
    setSelectedBook(bookId);
    toggleSidebar();
  };

  const loadChapters = async (bookId: string) => {
    try {
      const response = await getChapters(bookId);
      if (response && response.data) {
        setBibleVerseChapters(response.data);
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const searchBibleVerse = async (query: string) => {
    try {
      const response = await searchBible(query);
      if (response && response.data) {
        setBibleVerse(response.data);
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching bible verse:", error);
    }
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
        searchBibleVerse,
        toggleSidebar,
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
