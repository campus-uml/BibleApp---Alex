import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, Mock } from "vitest";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";

vi.mock("../../context/AuthContext");

describe("ProtectedRoute", () => {
it("renderiza los hijos cuando el usuario está autenticado", () => {
    (useAuth as Mock).mockReturnValue({ user: { name: "usuario de prueba" } });

    const { getByText } = render(
        <MemoryRouter initialEntries={["/protected"]}>
            <Routes>
                <Route
                    path="/protected"
                    element={
                        <ProtectedRoute>
                            <div>Contenido Protegido</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </MemoryRouter>
    );

    expect(getByText("Contenido Protegido")).toBeInTheDocument();
});

it("redirecciona a login cuando el usuario no está autenticado", () => {
    (useAuth as Mock).mockReturnValue({ user: null });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Contenido Protegido</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Página de Inicio de Sesión</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("Página de Inicio de Sesión")).toBeInTheDocument();
  });
});
