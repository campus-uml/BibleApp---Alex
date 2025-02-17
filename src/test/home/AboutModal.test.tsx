import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { AboutModal } from "../../components/home/AboutModal";

describe("AboutModal", () => {
  it("renderiza el botón del modal", () => {
    const { asFragment } = render(<AboutModal />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("abre el modal al hacer clic en el botón", async () => {
    const { asFragment } = render(<AboutModal />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByText("Acerca del Desarrollador")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("cerrar el modal al dar clik fuera de el", async () => {
    const { asFragment } = render(<AboutModal />);
    const button = screen.getByRole("button");
    await userEvent.click(button);

    const modalTitle = screen.getByText("Acerca del Desarrollador");
    expect(modalTitle).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
