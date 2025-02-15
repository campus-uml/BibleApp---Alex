import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MainLayout } from "../../layout/MainLayout";
import { useScrollHeader } from "../../Hooks/useScrollHeader";

vi.mock("@/Hooks/useScrollHeader", () => ({
  useScrollHeader: vi.fn(),
}));

vi.mock("@/components/AppSidebar", () => ({
  AppSidebar: () => <div data-testid="app-sidebar"></div>,
}));

vi.mock("@/components/ui/sidebar", () => ({
  SidebarInset: ({ children }) => (
    <div data-testid="sidebar-inset">{children}</div>
  ),
  SidebarTrigger: () => <button data-testid="sidebar-trigger"></button>,
}));

vi.mock("@/components/SearchBar", () => ({
  default: () => <input data-testid="search-bar" />,
}));

vi.mock("@/components/FooterCustom", () => ({
  default: () => <footer data-testid="footer-custom"></footer>,
}));

describe("MainLayout", () => {
  it("renderizar componentes correctamente", () => {
    useScrollHeader.mockReturnValue(true);

    render(
      <MainLayout>
        <div data-testid="child-content">Test Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId("app-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-inset")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("footer-custom")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("deberias ser visible el header cuando este sea true", () => {
    useScrollHeader.mockReturnValue(true);

    render(<MainLayout />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("translate-y-0 opacity-100");
  });

  it("oculta el header cuando este sea falsy", () => {
    useScrollHeader.mockReturnValue(false);

    render(<MainLayout />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("-translate-y-full opacity-0");
  });
});
