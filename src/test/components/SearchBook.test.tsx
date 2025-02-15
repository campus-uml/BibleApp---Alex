import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import SearchBook from "../../components/SearchBook";
import { vi } from "vitest";

describe("SearchBook Component", () => {
test("renderiza el campo de entrada con el marcador de posición", () => {
    render(<SearchBook onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Buscar en la Biblia...");
    expect(input).toBeInTheDocument();
});

test("llama a onSearch al escribir en el input", () => {
    const onSearchMock = vi.fn();
    render(<SearchBook onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText("Buscar en la Biblia...");
    
    fireEvent.change(input, { target: { value: "Genesis" } });
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("Genesis");
  });
});
