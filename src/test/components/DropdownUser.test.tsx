import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DropdownUser } from "../../components/DropdownUser";
import { AuthProvider } from "@/context/AuthContext";

// Mock the useAuth hook
vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      user_metadata: {
        full_name: "John Doe",
        user_name: "johndoe",
      },
      email: "john@example.com",
    },
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/mode-toggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

vi.mock("@/components/home/AboutModal", () => ({
  AboutModal: () => <div data-testid="about-modal">About Modal</div>,
}));

vi.mock("@/components/login/LogoutButton", () => ({
  __esModule: true,
  default: () => <button data-testid="logout-button">Logout</button>,
}));

describe("DropdownUser", () => {
  it("renders fallback avatar when no avatarUrl is provided", () => {
    const { asFragment } = render(
      <AuthProvider>
        <DropdownUser avatarUrl={null} />
      </AuthProvider>
    );
    const avatarButton = screen.getByRole("button");
    expect(avatarButton).toBeInTheDocument();
    expect(avatarButton).toHaveTextContent("J");
    expect(asFragment()).toMatchSnapshot();
  });
});
