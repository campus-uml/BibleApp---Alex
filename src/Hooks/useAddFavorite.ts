import { useState, useEffect } from "react";

export const useAddFavorite = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (verseId: string) => {
    setFavorites((prev) => [...prev, verseId]);
  };

  const removeFavorite = (verseId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== verseId));
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
};
