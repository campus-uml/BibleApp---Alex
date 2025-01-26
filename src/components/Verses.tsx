import { MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { bibleData } from "../Data/bible-data";
import type { Verse } from "../types";
import { useEffect, useState } from "react";

export default function BibleApp() {
  const [currentChapter, setCurrentChapter] = useState("1");
  const [currentVerses, setCurrentVerses] = useState<Verse[]>([]);

  useEffect(() => {
    const chapter = bibleData.chapters.find((c) => c.number === currentChapter);
    if (chapter) {
      setCurrentVerses(chapter.verses);
    }
  }, [currentChapter]);

  const handleChapterChange = (value: string) => {
    setCurrentChapter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-xl">
      <Tabs
        value={currentChapter}
        onValueChange={handleChapterChange}
        className="w-full sticky top-0 z-30 "
      >
        <TabsList className="w-full justify-start p-2 rounded-xl  text-white  h-auto flex-wrap">
          {bibleData.chapters.map((chapter) => (
            <TabsTrigger
              key={chapter.number}
              value={chapter.number}
              className="text-gray-800 "
            >
              Capítulo {chapter.number}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="p-4 space-y-4">
        {currentVerses.map((verse) => (
          <Card key={verse.number} className="shadow-sm">
            <CardContent className="p-4 flex gap-4">
              <span className="font-bold text-xl">{verse.number}</span>
              <p className="flex-1 text-lg">{verse.text}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copiar</DropdownMenuItem>
                  <DropdownMenuItem>Compartir</DropdownMenuItem>
                  <DropdownMenuItem>Marcador</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
