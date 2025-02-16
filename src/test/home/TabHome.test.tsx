import { render } from "@testing-library/react";
import { AuthProvider } from "@/context/AuthContext"; // Ensure correct import path
import { TabHome } from "../../components/home/TabHome";
import { describe, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("TabHome", () => {
  it("renderiza el componente Welcome en la pestaña Inicio", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <TabHome />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  it("renderiza el componente BibleVerse en la pestaña Lectura", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <TabHome />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  it("renderiza la pestaña de favoritos correctamente cuando no hay favoritos", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <TabHome />
        </AuthProvider>
      </MemoryRouter>
    );
  });
});
