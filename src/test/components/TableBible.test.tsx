import { render, screen } from "@testing-library/react";
import { TabBible } from "../../components/TabBible";
import { useBible } from "../../context/BIbleContext";
import { vi, describe, beforeEach, test, expect, Mock } from "vitest";

vi.mock("../../context/BIbleContext", () => ({
  useBible: vi.fn(),
}));

describe("TabBible Component", () => {
  const mockHandleBook = vi.fn();
  const mockBibleVerse = [
    { id: "gen", name: "Génesis" },
    { id: "exo", name: "Éxodo" },
  ];

  beforeEach(() => {
    (useBible as Mock).mockReturnValue({
      bibleVerse: mockBibleVerse,
      handleBook: mockHandleBook,
    });
  });

test(" deberia renderizar pestañas y lista de libros", () => {
    render(<TabBible searchTerm="" />);
    expect(screen.getByText("Antiguo")).toBeInTheDocument();
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
    expect(screen.getByText("Frecuentes")).toBeInTheDocument();
});

test("filtra libros basado en el término de búsqueda", () => {
    render(<TabBible searchTerm="g" />);
    expect(screen.queryByText("Génesis")).not.toBeInTheDocument();
});
});
