import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../context/AuthContext";
import { BibleProvider } from "../../context/BIbleContext";
import { TabHome } from "../../components/home/TabHome";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

beforeAll(() => {
  global.window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

vi.mock("@/components/Loading", () => ({
  Loading: () => null,
}));

vi.mock("@/context/BIbleContext", async () => {
  const actual = await import("@/context/BIbleContext");
  return {
    ...actual,
    BibleProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useBible: () => ({
      searchResults: [],
      favorites: [],
      bibleVerseChapters: [],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      loading: false,
    }),
  };
});

describe("TabHome", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SidebarProvider>
          <AuthProvider>
            <BibleProvider>
              <TabHome />
            </BibleProvider>
          </AuthProvider>
        </SidebarProvider>
      </MemoryRouter>
    );
  it('Reviar si todos los tabs de encuentrar"', async () => {
    renderComponent();
    expect(await screen.findByText("Inicio")).toBeInTheDocument();
    expect(await screen.findByText("Lectura")).toBeInTheDocument();
    expect(await screen.findByTestId("favoritos-tab")).toBeInTheDocument();
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
