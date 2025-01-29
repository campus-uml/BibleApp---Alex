import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Welcome from "./Welcome";
import BibleVerse from "../BibleVerse";
import { useBible } from "@/context/BIbleContext";
import { useEffect, useState } from "react";

export const TabHome = () => {
  const { searchResults, onClearSearch, selectedBook } = useBible();
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
            className="flex-1 px-6 py-3 text-sm font-medium transition-colors duration-100 ease-in-out rounded-md data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Favoritos
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
            />
          </TabsContent>
          <TabsContent
            value="favoritos"
            className="mt-4 p-4 rounded-lg bg-card text-card-foreground shadow-sm transition-opacity duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-bold mb-4">Favoritos</h2>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
