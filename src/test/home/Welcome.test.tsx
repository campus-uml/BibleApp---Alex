import { render, screen, fireEvent } from "@testing-library/react";
import Welcome from "@/components/home/Welcome";
import { useBible } from "@/context/BIbleContext";
import { useAddFavorite } from "@/Hooks/useAddFavorite";
import { vi, describe, beforeEach, it, expect, Mock } from "vitest";

vi.mock("@/context/BIbleContext");
vi.mock("@/Hooks/useAddFavorite");

describe("Pruebas en el componente Welcome.tsx", () => {
  const handleTabChange = vi.fn();
  const mockPassage = {
    id: 1,
    content: "Por que Dios amo al mundo...",
    reference: "Juan 3:16",
  };
  const mockFavorites = [
    { id: 1, content: "Por que que Dios amo al mundo...", reference: "Juan 3:16" },
  ];

  beforeEach(() => {
    (useBible as Mock).mockReturnValue({ passage: mockPassage });
    (useAddFavorite as Mock).mockReturnValue({
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      favorites: mockFavorites,
    });
  });

  it("debe renderizar el componente welcome", () => {
    const { asFragment } = render(<Welcome activeTab="lectura" handleTabChange={handleTabChange} />);
    expect(screen.getByText("Bienvenido a la BibliaApp")).toBeInTheDocument();
    expect(
      screen.getByText("Explora, estudia y comparte la palabra de Dios")
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("llama a handleTabChange cuando se hace clic en el botón 'Leer'", () => {
    const { asFragment } = render(<Welcome activeTab="lectura" handleTabChange={handleTabChange} />);
    fireEvent.click(screen.getByText("Leer"));
    expect(handleTabChange).toHaveBeenCalledWith("lectura");
    expect(asFragment()).toMatchSnapshot();
  });

  it("muestra el contenido y la referencia del pasaje", () => {
    const { asFragment } = render(<Welcome activeTab="lectura" handleTabChange={handleTabChange} />);
    expect(
      screen.getByText("Por que Dios amo al mundo...")
    ).toBeInTheDocument();
    expect(screen.getByText("Juan 3:16")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("elimina de favoritos cuando se hace clic nuevamente en el botón 'Guardar'", () => {
    const { removeFavorite } = useAddFavorite();
    const { asFragment } = render(<Welcome activeTab="lectura" handleTabChange={handleTabChange} />);
    fireEvent.click(screen.getByText("Guardar"));
    expect(removeFavorite).toHaveBeenCalledWith(mockPassage.id);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renderiza la sección 'Lectura Recomendada'", () => {
    const { asFragment } = render(<Welcome activeTab="lectura" handleTabChange={handleTabChange} />);
    expect(screen.getByText("Lectura Recomendada")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Explora el Libro de los Salmos, una colección de poemas y canciones que expresan una amplia gama de emociones humanas. (en desarrollo)"
      )
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renderiza la sección 'Guía de Estudio'", () => {
    const { asFragment } = render(<Welcome activeTab="lectura" handleTabChange={handleTabChange} />);
    expect(screen.getByText("Guía de Estudio")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Descubre cómo realizar un estudio bíblico efectivo con nuestra guía paso a paso. (en desarrollo)"
      )
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
