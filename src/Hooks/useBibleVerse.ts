import { useEffect, useState } from "react";
import { getBibles, getBiblesVerses } from "../services/getData";
import { BibleBooks, BibleVerse } from "../types/index";

export const useBibleVerse = () => {
  const [bibleVerse, setBibleVerse] = useState<BibleBooks[]>([]);
  const [bibleVerseChapters, setBibleVerseChapters] = useState<BibleVerse[]>(
    []
  );
  const [seletedBook, setSelectedBook] = useState<string | null>(null);

console.log(bibleVerseChapters)

  useEffect(() => {
    fetchData();
    if (seletedBook) {
      fetchVerse(seletedBook);
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

  const fetchVerse = async (bookId: string) => {
    try {
      const response = await getBiblesVerses(bookId);
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
  };
};
