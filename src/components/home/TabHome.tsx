
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Welcome from "./Welcome";
import BibleVerse from "../BibleVerse";
import { useBible } from "@/context/BIbleContext";
import { useEffect, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    if (selectedBook || searchResults) {
      setActiveTab("lectura");
    }
  }, [selectedBook, searchResults]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value !== "lectura") {
      onClearSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-2">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full mt-4"
      >
        <TabsList className="w-full flex justify-center mb-4 bg-muted p-1 rounded-lg">
          <TabsTrigger
            value="Inicio"
            className="flex-1 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50"
          >
            Inicio
          </TabsTrigger>
          <TabsTrigger
            value="lectura"
            className="flex-1 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50"
          >
            Lectura
          </TabsTrigger>
          <TabsTrigger
            value="favoritos"
            className="relative flex-1 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50"
          >
            Favoritos
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full min-w-[1rem] flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <div className="min-h-[400px] overflow-y-auto">
          <TabsContent value="Inicio" className="p-2 sm:p-4 bg-card rounded-lg">
            <Welcome activeTab={activeTab} handleTabChange={handleTabChange} />
          </TabsContent>
          <TabsContent value="lectura" >
            <BibleVerse
              searchResults={searchResults}
              onClearSearch={onClearSearch}
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </TabsContent>
          <TabsContent value="favoritos" className="p-2 sm:p-4 bg-card rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Favoritos</h2>
            {favorites.length > 0 ? (
              <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((favorite, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow-md">
                    <p className="text-sm text-slate-500 font-semibold mb-2">
                      {favorite.reference}
                    </p>
                    <p className="text-sm text-slate-800">{favorite.text}</p>
                    <div className="flex justify-between items-center mt-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFavorite(favorite.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-lg font-semibold text-slate-600">No hay favoritos aún</p>
                <p className="text-slate-500 mb-4">Guarda tus versículos favoritos</p>
                <Button onClick={() => handleTabChange("lectura")} className="bg-slate-900 text-white">
                  Ir a Lectura
                </Button>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
