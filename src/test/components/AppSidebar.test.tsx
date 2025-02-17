import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AppSidebar } from "../../components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { describe, it, expect } from "vitest";
import { BibleProvider } from "@/context/BIbleContext";

vi.mock("@/components/Loading", () => ({
  Loading: () => null, // No mostrar loading en las pruebas
}));

vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
);

describe("AppSidebar Component", () => {
  it("should render sidebar after loading", async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <SidebarProvider>
          <AuthProvider>
            <BibleProvider>
              <AppSidebar />
            </BibleProvider>
          </AuthProvider>
        </SidebarProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/BibleApp/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
