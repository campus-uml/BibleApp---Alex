import { useEffect, useState } from "react";
import { getBibles, getBiblesChapters } from "../services/getData";
import { BibleBooks, BibleChapter } from "../types/index";

export const useBibleVerse = () => {
  const [bibleVerse, setBibleVerse] = useState<BibleBooks[]>([]);
  const [bibleVerseChapters, setBibleVerseChapters] = useState<BibleChapter[]>(
    []
  );
  const [seletedBook, setSelectedBook] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    if (seletedBook) {
      fetchChapters(seletedBook);
    }
  }, [seletedBook]);

  const fetchData = async () => {
    try {
      const response = await getBibles();
      if (response && response.data) {
        setBibleVerse(response.data);
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChapters = async (bookId: string) => {
    try {
      const response = await getBiblesChapters(bookId);
      if (response && response.data) {
        setBibleVerseChapters(response.data);
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBook = (bookId: string) => {
    setSelectedBook(bookId);
  };

  return {
    handleBook,
    bibleVerse,
    bibleVerseChapters,
    seletedBook,
  };
};
