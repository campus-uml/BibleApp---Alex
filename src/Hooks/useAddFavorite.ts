import { Verse } from "@/types";
import { useState, useEffect } from "react";

export const useAddFavorite = () => {
  const [favorites, setFavorites] = useState<Verse[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (verse: Verse) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === verse.id)
        ? prevFavorites
        : [...prevFavorites, verse] 
    );
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
