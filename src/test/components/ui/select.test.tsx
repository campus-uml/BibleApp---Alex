import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";

describe("Select Component", () => {


    it("renderiza SelectSeparator con separador personalizado correctamente", () => {
        render(
        <Select>
            <SelectTrigger>Selecciona una opción</SelectTrigger>
            <SelectContent>
            <SelectItem value="option1">Opción 1</SelectItem>
            <SelectSeparator />
            <SelectItem value="option2">Opción 2</SelectItem>
            </SelectContent>
        </Select>
        );
        fireEvent.click(screen.getByText("Selecciona una opción"));
        expect(screen.getByText("Opción 1")).toBeInTheDocument();
        expect(screen.getByText("Opción 2")).toBeInTheDocument();
    });
});
