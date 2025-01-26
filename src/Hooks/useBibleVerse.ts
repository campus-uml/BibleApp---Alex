import { useEffect, useRef, useState } from "react";
import {
  getBibles,
  getChapters,
  loadChapterVersesFromAPI,
} from "../services/getData";
import { BibleBooks, Chapter, Verse } from "../types/index";

const formatVerseText = (text: string) => {
  return text.toLowerCase().replace(/^([a-z])/, (match) => match.toUpperCase());
};

const isTitleOrHeading = (text: string) => {
  const titleKeywords = ["Capítulo", "Libro", "Título"];
  return titleKeywords.some((keyword) => text.includes(keyword));
};

export const useBibleVerse = () => {
  const [bibleVerse, setBibleVerse] = useState<BibleBooks[]>([]);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [bibleVerseChapters, setBibleVerseChapters] = useState<Chapter[]>([]);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, [selectedBook]);

  useEffect(() => {
    if (selectedBook) {
      loadChapters(selectedBook);
    }
  }, [selectedBook]);

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

  useEffect(() => {
    const defaultBookId = "PSA";
    setSelectedBook(defaultBookId);
    loadChapters(defaultBookId);
  }, []);

  return {
    handleBook,
    bibleVerse,
    bibleVerseChapters,
    selectedBook,
    chapterVerses,
    loadChapterVerses,
    scrollAreaRef,
  };
};
