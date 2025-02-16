import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "@/components/ui/skeleton";

describe("Componente Skeleton", () => {
    it("se renderiza sin fallar", () => {
        const { container } = render(<Skeleton />);
        expect(container).toBeInTheDocument();
    });

    it("aplica clases por defecto", () => {
        const { container } = render(<Skeleton />);
        const div = container.firstChild;
        expect(div).toHaveClass("animate-pulse rounded-md bg-primary/10");
    });

    it("aplica clases adicionales", () => {
        const { container } = render(<Skeleton className="extra-class" />);
        const div = container.firstChild;
        expect(div).toHaveClass("animate-pulse rounded-md bg-primary/10 extra-class");
    });

    it("pasa propiedades adicionales", () => {
        const { container } = render(<Skeleton data-testid="skeleton" />);
        const div = container.firstChild;
        expect(div).toHaveAttribute("data-testid", "skeleton");
    });
});
