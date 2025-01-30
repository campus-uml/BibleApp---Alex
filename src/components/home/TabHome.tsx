"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Welcome from "./Welcome"
import BibleVerse from "../BibleVerse"
import { useBible } from "@/context/BIbleContext"
import { useEffect, useState } from "react"
import { Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const TabHome = () => {
  const { searchResults, onClearSearch, selectedBook, favorites, addFavorite, removeFavorite } = useBible()

  const [activeTab, setActiveTab] = useState("Inicio")

  useEffect(() => {
    if (selectedBook) {
      setActiveTab("lectura")
    }
  }, [selectedBook])

  useEffect(() => {
    if (searchResults) {
      setActiveTab("lectura")
    }
  }, [searchResults])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value !== "lectura") {
      onClearSearch()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mt-4">
        <TabsList className="w-full flex justify-center mb-6 bg-muted p-1 rounded-lg">
          <TabsTrigger
            value="Inicio"
            className="flex-1 px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors duration-100 ease-in-out rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Inicio
          </TabsTrigger>
          <TabsTrigger
            value="lectura"
            className="flex-1 px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors duration-100 ease-in-out rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Lectura
          </TabsTrigger>
          <TabsTrigger
            value="favoritos"
            className="relative flex-1 px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors duration-100 ease-in-out rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Favoritos
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[1.5rem] flex items-center justify-center">
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((favorite, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-semibold mb-2">{favorite.reference}</p>
                      <p className="text-base text-slate-800">{favorite.text}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFavorite(favorite.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-100"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                      >
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl font-semibold text-slate-600 mb-2">No hay favoritos aún</p>
                <p className="text-slate-500 mb-6">Guarda tus versículos favoritos para acceder a ellos fácilmente</p>
                <Button
                  onClick={() => handleTabChange("lectura")}
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  Ir a Lectura
                </Button>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

