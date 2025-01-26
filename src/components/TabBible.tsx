import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBibleVerse } from "@/Hooks/useBibleVerse";
import { Button } from "./ui/button";
import { newTestamentIds, oldTestamentIds } from "../utils/Abreviations";

export const TabBible = () => {
  const { bibleVerse, handleBook } = useBibleVerse();

  const oldTestamentBooks = bibleVerse.filter((book) =>
    oldTestamentIds.includes(book.id)
  );
  const newTestamentBooks = bibleVerse.filter((book) =>
    newTestamentIds.includes(book.id)
  );

  return (
    <Tabs defaultValue="Antiguo" className="w-full ">
      <TabsList className="flex gap-2 ">
        <TabsTrigger value="Antiguo" className="text-xs">
          Antiguo
        </TabsTrigger>
        <TabsTrigger value="Nuevo" className="text-xs">
          Nuevo
        </TabsTrigger>
        <TabsTrigger value="Frecuentes" className="text-xs">
          Frecuentes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Antiguo">
        <ul className="flex flex-col gap-2 p-2">
          {oldTestamentBooks.length > 0 ? (
            oldTestamentBooks.map((v, index) => (
              <Button
                key={index}
                onClick={() => handleBook(v.id)}
                className="flex items-center gap-2 p-2 bg-transparent text-black hover:bg-gray-200"
              >
                <h2 className="text-lg font-semibold">{v.name}</h2>
              </Button>
            ))
          ) : (
            <p>No data available</p>
          )}
        </ul>
      </TabsContent>
      <TabsContent value="Nuevo">
        <ul className="flex flex-col gap-2 p-2">
          {newTestamentBooks.length > 0 ? (
            newTestamentBooks.map((v, index) => (
              <Button
                key={index}
                className="flex items-center gap-2 p-2 bg-transparent text-black hover:bg-gray-200"
              >
                <h2 className="text-lg font-semibold">{v.name}</h2>
              </Button>
            ))
          ) : (
            <p>No data available</p>
          )}
        </ul>
      </TabsContent>
      <TabsContent value="Frecuentes">Informacion frecuente</TabsContent>
    </Tabs>
  );
};
