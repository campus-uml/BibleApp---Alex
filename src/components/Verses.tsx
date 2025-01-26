"use client";

import { useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useBibleVerse } from "../Hooks/useBibleVerse";

export default function BibleApp() {
  const { handleBook, bibleVerseChapters } = useBibleVerse();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultBookId =  "MAT";
    handleBook(defaultBookId);
  }, [handleBook]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 overflow-hidden">
      <Tabs defaultValue="1" className="w-full max-w-72 md:max-w-5xl mx-auto">
        <div className="relative">
          <TabsList className=" h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-full overflow-hidden">
            <ScrollArea
              ref={scrollAreaRef}
              className="w-full whitespace-nowrap"
            >
              {bibleVerseChapters.map((chapter) => (
                <TabsTrigger
                  key={chapter.id}
                  value={chapter.number.toString()}
                  className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground px-3 py-1.5"
                >
                  {chapter.number}
                </TabsTrigger>
              ))}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsList>
        </div>

        <div className="mt-4 p-4">
          {bibleVerseChapters.map((chapter) => (
            <TabsContent
              key={chapter.id}
              value={chapter.number.toString()}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
               Capitulo {chapter.number}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {chapter.reference || "No content available for this chapter."}
              </p>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
