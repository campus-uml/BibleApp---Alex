import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBible } from "../context/BIbleContext";

export default function BibleApp() {
  const {
    bibleVerseChapters,
    chapterVerses,
    loadChapterVerses,
    scrollAreaRef,
    selectedBook,
    bibleVerse,
  } = useBible();

  const bookName = (selectedBook: string) => {
    const book = bibleVerse.find((book) => book.id === selectedBook);
    return book ? book.name : "Selecciona un libro";
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto">
      <Tabs
        defaultValue="1"
        className="w-full max-w-[22rem] md:max-w-6xl mx-auto"
      >
        <div className="relative">
          <div className=" ">
            <h1 className="text-xl font-bold text-center text-gray-800">
              {bookName(selectedBook)}
            </h1>
          </div>
          <TabsList className="h-10  items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-full overflow-hidden">
            <ScrollArea
              ref={scrollAreaRef}
              className="w-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              <div className="flex items-center gap-2 pb-2 pt-2">
                {bibleVerseChapters.map((chapter) => (
                  <TabsTrigger
                    key={chapter.id}
                    value={chapter.number.toString()}
                    onClick={() => loadChapterVerses(chapter.id)}
                    className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground px-3 py-1.5"
                  >
                    {chapter.number}
                  </TabsTrigger>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsList>
        </div>

        <div className="flex flex-col gap-4">
          {bibleVerseChapters.map((chapter) => (
            <TabsContent
              key={chapter.id}
              value={chapter.number.toString()}
              className="bg-white rounded-lg shadow-sm p-2"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Capítulo {chapter.number}
              </h2>
              <div className="space-y-4">
                {chapterVerses.length > 0 ? (
                  chapterVerses.map((verse, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg p-4"
                    >
                      <h3 className="text-xs font-semibold mb-2">
                        {verse.reference}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {verse.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center font-semibold text-lg mt-4">
                    Selecciona un capítulo
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
