import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const TermsAndServices = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Términos y Servicios
      </h1>
      <ScrollArea className="h-[60vh] rounded-md border p-4">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al utilizar nuestra aplicación bíblica, usted acepta estar sujeto
              a estos Términos y Servicios. Si no está de acuerdo con alguna
              parte de los términos, no podrá utilizar nuestra aplicación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Uso de la Aplicación
            </h2>
            <p>
              Nuestra aplicación está diseñada para proporcionar acceso a textos
              bíblicos y recursos relacionados. Usted se compromete a utilizar
              la aplicación solo para fines legales y de una manera que no
              infrinja los derechos de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Propiedad Intelectual
            </h2>
            <p>
              Los textos bíblicos y otros contenidos proporcionados en la
              aplicación están sujetos a derechos de autor y otras leyes de
              propiedad intelectual. Se le concede un derecho limitado para uso
              personal y no comercial de estos contenidos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Privacidad</h2>
            <p>
              Su privacidad es importante para nosotros. Consulte nuestra
              Política de Privacidad para entender cómo recopilamos, usamos y
              protegemos sus datos personales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar o reemplazar estos Términos
              en cualquier momento. Es su responsabilidad revisar estos Términos
              periódicamente para estar al tanto de cualquier cambio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Limitación de Responsabilidad
            </h2>
            <p>
              No seremos responsables de ningún daño indirecto, incidental,
              especial, consecuente o punitivo, o cualquier pérdida de
              beneficios o ingresos, ya sea incurrida directa o indirectamente,
              o cualquier pérdida de datos, uso, buena voluntad, u otras
              pérdidas intangibles, resultantes de su acceso o uso de la
              aplicación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Ley Aplicable</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes
              de [su país/estado], sin tener en cuenta sus disposiciones sobre
              conflictos de leyes.
            </p>
          </section>
        </div>
      </ScrollArea>
      <div className="mt-6 flex justify-center">
        <Button className="px-6 py-2">Acepto los Términos y Servicios</Button>
      </div>
    </div>
  );
};

export default TermsAndServices;
