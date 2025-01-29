import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Welcome from "./Welcome";
import BibleVerse from "../BibleVerse";
import { useBible } from "@/context/BIbleContext";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export const TabHome = () => {
  const {
    searchResults,
    onClearSearch,
    selectedBook,
    favorites,
    addFavorite,
    removeFavorite,
  } = useBible();

  const [activeTab, setActiveTab] = useState("Inicio");

  useEffect(() => {
    if (selectedBook) {
      setActiveTab("lectura");
    }
  }, [selectedBook]);

  useEffect(() => {
    if (searchResults) {
      setActiveTab("lectura");
    }
  }, [searchResults]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value !== "lectura") {
      onClearSearch();
    }
  };

  console.log("estos son los favoritos", favorites);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full mt-4"
      >
        <TabsList className="w-full flex justify-center mb-6 bg-muted p-1 rounded-lg">
          <TabsTrigger
            value="Inicio"
            className="flex-1 px-6 py-3 text-sm font-medium transition-colors duration-100 ease-in-out rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Inicio
          </TabsTrigger>
          <TabsTrigger
            value="lectura"
            className="flex-1 px-6 py-3 text-sm font-medium transition-colors duration-100 ease-in-out rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Lectura
          </TabsTrigger>
          <TabsTrigger
            value="favoritos"
            className="relative flex-1 px-6 py-3 text-sm font-medium transition-colors duration-100 ease-in-out rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Favoritos
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent bg-red-300 text-slate-900 text-xs font-semibold px-2 py-1 rounded-full">
                {favorites.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <div className="min-h-[500px] overflow-y-auto">
          <TabsContent
            value="Inicio"
            className="mt-4 p-4 rounded-lg bg-card text-card-foreground shadow-sm transition-opacity duration-300 ease-in-out"
          >
            <Welcome />
          </TabsContent>
          <TabsContent value="lectura">
            <BibleVerse
              searchResults={searchResults}
              onClearSearch={onClearSearch}
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </TabsContent>
          <TabsContent
            value="favoritos"
            className="mt-4 p-4 rounded-lg bg-card text-card-foreground shadow-sm transition-opacity duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-bold mb-4">Favoritos</h2>

            {favorites.length > 0 ? (
              <div className="grid gap-4">
                {favorites.map((favorite, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <p className="text-sm text-slate-500 font-semibold mb-2">
                      {favorite.reference}
                    </p>
                    <p className="text-base text-slate-800">{favorite.text}</p>

                    <button className="mt-4 text-accent-foreground hover:text-accent" onClick={() => removeFavorite(favorite.id)}>
                      <Heart
                        className={`w-6 h-6 ${
                          favorites.some((fav) => fav.id === favorite.id)
                            ? "text-red-500"
                            : "text-gray-900"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hay favoritos</p>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
