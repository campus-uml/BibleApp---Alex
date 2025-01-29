import { Verse } from "@/types";
import { useState, useEffect } from "react";

export const useAddFavorite = () => {
  const [favorites, setFavorites] = useState<Verse[]>([
    {
      id: "1",
      text: "En el principio Dios creo los cielos y la tierra.",
      reference: "Genesis 1:1",
    },
  ]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (verseId: string) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === verseId)) {
        return prev;
      }

      const verse = getVerseById(verseId);
      return [...prev, verse];
    });
  };

  const removeFavorite = (verseId: string) => {
    setFavorites((prev) => prev.filter((verse) => verse.id !== verseId));
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
};

const getVerseById= (verseId: string): Verse => {
  return {
    id: verseId,
    text: "En el principio Dios creo los cielos y la tierra.",
    reference: "Genesis 1:1",
  };
}