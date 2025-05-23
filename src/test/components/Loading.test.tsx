import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loading } from "../../components/Loading";

describe("Pruebas en el componente Loading", () => {
    it("se renderiza sin fallar", () => {
        const { asFragment } = render(<Loading />);
        expect(screen.getByText("Cargando...")).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
});
