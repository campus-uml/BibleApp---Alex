import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Heart, BookMarked } from "lucide-react";
import { useBible } from "@/context/BIbleContext";
import { useAddFavorite } from "@/Hooks/useAddFavorite";

interface WelcomeProps {
  activeTab: string;
  handleTabChange: (value: string) => void;
}

const Welcome = ({ activeTab, handleTabChange }: WelcomeProps) => {
  const { passage } = useBible();
  const { addFavorite, removeFavorite, favorites } = useAddFavorite();

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Bienvenido a la BibliaApp
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Explora, estudia y comparte la palabra de Dios
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Selecciona un libro de la Biblia para comenzar a leer o utiliza la
            búsqueda para encontrar versículos específicos.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            value={activeTab}
            onClick={() => handleTabChange("lectura")}
          >
            <BookOpen className="w-4 h-4" />
            <span>Leer</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Usa el buscador</span>
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Versículo del Día</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <p className="italic text-slate-800 dark:text-slate-200 ">
              {passage?.content ?? "No hay versículo disponible."}
            </p>
            <h3 className="text-sm text-muted-foreground">
              {passage?.reference}
            </h3>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                if (passage) {
                  if (favorites.some((fav) => fav.id === passage.id)) {
                    removeFavorite(passage.id);
                  } else {
                    addFavorite({ ...passage, reference: passage.content });
                  }
                }
              }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lectura Recomendada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Explora el Libro de los Salmos, una colección de poemas y
              canciones que expresan una amplia gama de emociones humanas. (en
              desarrollo)
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              <BookMarked className="w-4 h-4 mr-2" />
              Comenzar Lectura
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Guía de Estudio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Descubre cómo realizar un estudio bíblico efectivo con nuestra
              guía paso a paso. (en desarrollo)
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              Ver Guía
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
