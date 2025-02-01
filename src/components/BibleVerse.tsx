import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBible } from "../context/BIbleContext";
import { Copy, Heart, ArrowLeft, Share, Play, Book } from "lucide-react";
import type { SearchResults, Verse } from "@/types";
import { Button } from "@/components/ui/button";
import { useActions } from "@/Hooks/useActions";

interface BibleVerseProps {
  searchResults: SearchResults | null;
  onClearSearch: () => void;
  addFavorite: (verse: Verse) => void;
  removeFavorite: (verseId: string) => void;
  favorites: Verse[];
}

export const BibleVerse = ({
  searchResults,
  onClearSearch,
  addFavorite,
  favorites,
  removeFavorite,
}: BibleVerseProps) => {
  const {
    bibleVerseChapters,
    chapterVerses,
    loadChapterVerses,
    scrollAreaRef,
    selectedBook,
    bibleVerse,
  } = useBible();
  const { copyToClipboard, shareToWhatsApp } = useActions();

  const bookName = (selectedBook: string) => {
    const book = bibleVerse.find((book) => book.id === selectedBook);
    return book ? book.name : "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs
        defaultValue="1"
        className="w-full max-w-[21.2rem] md:max-w-6xl mx-auto"
      >
        <div className="sticky top-0 bg-gray-50 z-10 pb-4">
          {searchResults ? (
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={onClearSearch}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Volver
              </Button>
              <h2 className="text-xl font-semibold text-gray-800">
                Resultados de búsqueda
              </h2>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                {bookName(selectedBook)}
              </h1>
              {bibleVerseChapters.length > 0 ? (
                <TabsList className="h-12 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-full overflow-hidden">
                  <ScrollArea
                    ref={scrollAreaRef}
                    className="w-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    <div className="flex items-center gap-2 py-1">
                      {bibleVerseChapters.map((chapter) => (
                        <TabsTrigger
                          key={chapter.id}
                          value={chapter.number.toString()}
                          onClick={() => loadChapterVerses(chapter.id)}
                          className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground px-3 py-1.5 rounded-md"
                        >
                          {chapter.number}
                        </TabsTrigger>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsList>
              ) : (
                <div className="text-center py-8">
                  <Book className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-lg font-semibold text-slate-600">
                    No hay versículos aún
                  </p>
                  <p className="text-slate-500 mb-4">
                    Selecciona en la parte superior para comenzar
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {searchResults &&
        searchResults.verses &&
        searchResults.verses.length > 0 ? (
          <div className="space-y-4 mt-4">
            {searchResults.verses.map((verse, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-2">
                <h3 className="text-sm text-slate-500 font-semibold mb-2">
                  {verse.id}
                </h3>
                <p className="text-base text-gray-700">{verse.text}</p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() =>
                      favorites.some((fav) => fav.id === verse.id)
                        ? removeFavorite(verse.id)
                        : addFavorite({ ...verse, reference: verse.id })
                    }
                    className="mt-2 focus:outline-none"
                    aria-label={
                      favorites.some((fav) => fav.id === verse.id)
                        ? "remover"
                        : "agregar"
                    }
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        favorites.some((fav) => fav.id === verse.id)
                          ? "text-red-500"
                          : "text-gray-900"
                      }`}
                    />
                  </button>
                  <button className="text-gray-600 hover:text-blue-500 transition-colors">
                    <Play size={20} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(verse.text)}
                    className="text-gray-600 hover:text-green-500 transition-colors"
                  >
                    <Copy size={20} />
                  </button>
                  <button
                    onClick={() => shareToWhatsApp(verse.text)}
                    className="text-gray-600 hover:text-purple-500 transition-colors"
                  >
                    <Share size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {bibleVerseChapters.map((chapter) => (
              <TabsContent
                key={chapter.id}
                value={chapter.number.toString()}
                className="bg-white rounded-lg shadow-sm p-2"
              >
                <h2 className="text-xl text-center font-semibold mb-4 text-gray-800">
                  Capítulo {chapter.number}
                </h2>
                <div className="space-y-4">
                  {chapterVerses.map((verse, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg p-4"
                    >
                      <h3 className="text-sm text-slate-500 font-semibold mb-2">
                        {verse.reference}
                      </h3>
                      <p className="text-gray-700 leading-relaxed italic">
                        {verse.text}
                      </p>
                      <div className="flex justify-end gap-4 mt-4">
                        <button
                          onClick={() =>
                            favorites.some((fav) => fav.id === verse.id)
                              ? removeFavorite(verse.id)
                              : addFavorite({ ...verse, reference: verse.id })
                          }
                          className="mt-2 focus:outline-none"
                          aria-label={
                            favorites.some((fav) => fav.id === verse.id)
                              ? "remover"
                              : "agregar"
                          }
                        >
                          <Heart
                            size={20}
                            className={` ${
                              favorites.some((fav) => fav.id === verse.id)
                                ? "text-red-500"
                                : "text-gray-900"
                            }`}
                          />
                        </button>
                        <button className="text-gray-600 hover:text-blue-500 transition-colors">
                          <Play size={20} />
                        </button>
                        <button
                          onClick={() => copyToClipboard(verse.text)}
                          className="text-gray-600 hover:text-green-500 transition-colors"
                        >
                          <Copy size={20} />
                        </button>
                        <button
                          onClick={() => shareToWhatsApp(verse.text)}
                          className="text-gray-600 hover:text-purple-500 transition-colors"
                        >
                          <Share size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default BibleVerse;
