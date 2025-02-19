
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "@/components/ui/label";

describe("Componente Label", () => {
    it("se renderiza sin fallar", () => {
        const { getByText } = render(<Label>Etiqueta de prueba</Label>);
        expect(getByText("Etiqueta de prueba")).toBeInTheDocument();
    });

    it("aplica className personalizado", () => {
        const { container } = render(<Label className="clase-personalizada">Etiqueta de prueba</Label>);
        expect(container.firstChild).toHaveClass("clase-personalizada");
    });

    it("aplica clases de variante", () => {
        const { container } = render(<Label className="texto-pequeño fuente-media">Etiqueta de prueba</Label>);
        expect(container.firstChild).toHaveClass("texto-pequeño");
        expect(container.firstChild).toHaveClass("fuente-media");
    });

    it("maneja el estado peer-disabled", () => {
        const { container } = render(<Label className="peer-disabled:cursor-no-permitido peer-disabled:opacidad-70">Etiqueta de prueba</Label>);
        expect(container.firstChild).toHaveClass("peer-disabled:cursor-no-permitido");
        expect(container.firstChild).toHaveClass("peer-disabled:opacidad-70");
    });
});
