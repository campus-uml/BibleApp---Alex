
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Heart, BookMarked } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Bienvenido a la Biblia Digital</CardTitle>
          <CardDescription className="text-center text-lg">
            Explora, estudia y comparte la palabra de Dios
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Selecciona un libro de la Biblia para comenzar a leer o utiliza la búsqueda para encontrar versículos específicos.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Leer</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Buscar</span>
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Versículo del Día</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground italic">
              "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
            </p>
            <p className="mt-2 font-semibold">Juan 3:16</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
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
            <p className="text-muted-foreground">Explora el Libro de los Salmos, una colección de poemas y canciones que expresan una amplia gama de emociones humanas.</p>
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
            <p className="text-muted-foreground">Descubre cómo realizar un estudio bíblico efectivo con nuestra guía paso a paso.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">Ver Guía</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
