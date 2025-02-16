import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { Mock } from "vitest";
import SearchBar from "../../components/SearchBar";
import { useBible } from "../../context/BIbleContext";

vi.mock("../../context/BIbleContext");

describe("SearchBar", () => {
  it("llama a searchBibleVerse al enviar el formulario", async () => {
    const searchBibleVerse = vi.fn();
    (useBible as Mock).mockReturnValue({ searchBibleVerse });

    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Ejemplo: 'Dios', 'fe', 'esperanza'"
    );
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Dios" } });
    fireEvent.click(button);

    expect(searchBibleVerse).toHaveBeenCalledWith("Dios");
  });

  it("deshabilita el input y el botón mientras se carga", async () => {
    const searchBibleVerse = vi.fn();
    (useBible as Mock).mockReturnValue({ searchBibleVerse });

    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Ejemplo: 'Dios', 'fe', 'esperanza'"
    );
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Dios" } });
    fireEvent.click(button);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
