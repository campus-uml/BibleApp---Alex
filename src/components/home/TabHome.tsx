import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BibleApp from "../Verses";

export const TabHome = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Tabs defaultValue="Inicio" className="w-full">
        <TabsList className="w-full flex justify-center mb-6 bg-muted p-1 rounded-lg">
          <TabsTrigger
            value="Inicio"
            className="flex-1 px-6 py-3 text-sm font-medium transition-colors duration-300 ease-in-out rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Inicio
          </TabsTrigger>
          <TabsTrigger
            value="lectura"
            className="flex-1 px-6 py-3 text-sm font-medium transition-colors duration-300 ease-in-out rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Lectura
          </TabsTrigger>
        </TabsList>
        <div className="min-h-[500px] overflow-y-auto">
          <TabsContent
            value="Inicio"
            className="mt-4 p-4 rounded-lg bg-card text-card-foreground shadow-sm transition-opacity duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
          </TabsContent>
          <TabsContent value="lectura">
            <BibleApp />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
