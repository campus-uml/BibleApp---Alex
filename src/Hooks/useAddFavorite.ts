import { useState, useEffect } from "react";
import type { Verse } from "@/types";
import { supabase } from "@/constants/api";
import { useAuth } from "@/context/AuthContext";

export const useAddFavorite = () => {
  const [favorites, setFavorites] = useState<Verse[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching favorites:", error);
    } else {
      setFavorites(data.map((item) => item.verse_data));
    }
  };

  const addFavorite = async (verse: Verse) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        verse_id: verse.id,
        verse_data: {
          id: verse.id,
          text: verse.text,
          reference: verse.reference,
          // Añade aquí cualquier otro campo que necesites guardar
        },
      })
      .select();

    if (error) {
      console.error("Error adding favorite:", error);
    } else if (data) {
      setFavorites((prev) => [...prev, data[0].verse_data]);
    }
  };

  const removeFavorite = async (verseId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("verse_id", verseId);

    if (error) {
      console.error("Error removing favorite:", error);
    } else {
      setFavorites((prev) => prev.filter((verse) => verse.id !== verseId));
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
};
