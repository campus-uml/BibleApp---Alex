"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useBible } from "../context/BIbleContext"
import { Copy, Forward, Heart, Play } from "lucide-react"
import type { SearchResults } from "@/types"

interface BibleVerseProps {
  searchResults: SearchResults | null
}

export const BibleVerse = ({ searchResults }: BibleVerseProps) => {
  const { bibleVerseChapters, chapterVerses, loadChapterVerses, scrollAreaRef, selectedBook, bibleVerse } = useBible()

  const bookName = (selectedBook: string) => {
    const book = bibleVerse.find((book) => book.id === selectedBook)
    return book ? book.name : "Selecciona un libro"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs defaultValue="1" className="w-full max-w-[22rem] md:max-w-6xl mx-auto">
        <div className="sticky top-0 bg-gray-50 z-10 pb-4">
          {!searchResults && (
            <>
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">{bookName(selectedBook)}</h1>
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
            </>
          )}
        </div>

        {searchResults && searchResults.verses && searchResults.verses.length > 0 ? (
          <div className="space-y-4 mt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Versículos encontrados</h2>
            {searchResults.verses.map((verse, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-sm text-slate-500 font-semibold mb-2">{verse.id}</h3>
                <p className="text-base text-gray-700">{verse.text}</p>
                <div className="flex justify-end gap-4 mt-4">
                  <button className="text-gray-600 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-blue-500 transition-colors">
                    <Forward size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-green-500 transition-colors">
                    <Copy size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-purple-500 transition-colors">
                    <Play size={20} />
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
                className="bg-white rounded-lg shadow-sm p-4"
              >
                <h2 className="text-xl text-center font-semibold mb-4 text-gray-800">Capítulo {chapter.number}</h2>
                <div className="space-y-4">
                  {chapterVerses.length > 0 ? (
                    chapterVerses.map((verse, index) => (
                      <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-sm text-slate-500 font-semibold mb-2">{verse.reference}</h3>
                        <p className="text-gray-700 leading-relaxed">{verse.text}</p>
                        <div className="flex justify-end gap-4 mt-4">
                          <button className="text-gray-600 hover:text-red-500 transition-colors">
                            <Heart size={20} />
                          </button>
                          <button className="text-gray-600 hover:text-blue-500 transition-colors">
                            <Forward size={20} />
                          </button>
                          <button className="text-gray-600 hover:text-green-500 transition-colors">
                            <Copy size={20} />
                          </button>
                          <button className="text-gray-600 hover:text-purple-500 transition-colors">
                            <Play size={20} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center font-semibold text-lg mt-4">Selecciona un capítulo</p>
                  )}
                </div>
              </TabsContent>
            ))}
          </div>
        )}
      </Tabs>
    </div>
  )
}

export default BibleVerse

