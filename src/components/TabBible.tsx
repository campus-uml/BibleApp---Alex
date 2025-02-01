import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBible } from "../context/BIbleContext";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { newTestamentIds, oldTestamentIds } from "../utils/Abreviations";

interface TabBibleProps {
  searchTerm: string;
}

export const TabBible = ({ searchTerm }: TabBibleProps) => {
  const { bibleVerse, handleBook } = useBible();

  const filteredBooks = bibleVerse.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredOldTestamentBooks = filteredBooks.filter((book) =>
    oldTestamentIds.includes(book.id)
  );
  const filteredNewTestamentBooks = filteredBooks.filter((book) =>
    newTestamentIds.includes(book.id)
  );

  const renderBookList = (books: typeof filteredOldTestamentBooks) => (
    <ScrollArea className="h-[80vh] w-full rounded-md border">
      <div className="p-4">
        {books.length > 0 ? (
          books.map((v, index) => (
            <Button
              key={index}
              onClick={() => handleBook(v.id)}
              variant="ghost"
              className="w-full justify-start text-left font-normal mb-2 hover:bg-accent hover:text-accent-foreground"
            >
              <span className="text-base">{v.name}</span>
            </Button>
          ))
        ) : (
          <p className="text-muted-foreground">No se encontraron libros</p>
        )}
      </div>
    </ScrollArea>
  );

  return (
    <Tabs defaultValue="Antiguo" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="Antiguo">Antiguo</TabsTrigger>
        <TabsTrigger value="Nuevo">Nuevo</TabsTrigger>
        <TabsTrigger value="Frecuentes">Frecuentes</TabsTrigger>
      </TabsList>
      <TabsContent value="Antiguo">
        {renderBookList(filteredOldTestamentBooks)}
      </TabsContent>
      <TabsContent value="Nuevo">
        {renderBookList(filteredNewTestamentBooks)}
      </TabsContent>
      <TabsContent value="Frecuentes">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-medium mb-2">Información frecuente</h3>
          <p className="text-muted-foreground">
            Aquí puedes agregar información sobre los libros más frecuentemente
            consultados o versículos populares. (en desarrollo)
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
