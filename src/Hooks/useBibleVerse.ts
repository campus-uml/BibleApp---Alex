import { useEffect, useState } from "react";
import { getBibles } from "../services/getData";
import { BibleBooks } from "../types/index";

export const useBibleVerse = () => {
  const [bibleVerse, setBibleVerse] = useState<BibleBooks[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

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

  return {
    bibleVerse,
  };
};
