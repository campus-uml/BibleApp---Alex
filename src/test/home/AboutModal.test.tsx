import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { AboutModal } from "../../components/home/AboutModal";

describe("AboutModal", () => {
  it("renderiza el botón del modal", () => {
    render(<AboutModal />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("abre el modal al hacer clic en el botón", async () => {
    render(<AboutModal />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByText("Acerca del Desarrollador")).toBeInTheDocument();
  });

  it("cerrar el modal al dar clik fuera de el", async () => {
    render(<AboutModal />);
    const button = screen.getByRole("button");
    await userEvent.click(button);

    const modalTitle = screen.getByText("Acerca del Desarrollador");
    expect(modalTitle).toBeInTheDocument();
  });
});
