import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { supabase } from "@/constants/api";

vi.mock("@/constants/api", () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      onAuthStateChange: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

vi.mock("../../components/Loading", () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("muestra el estado de carga inicialmente", async () => {
    supabase.auth.getUser.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { user: null } }), 100)
        )
    );
    supabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <div>Child component</div>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  it("proporciona el contexto de usuario autenticado", async () => {
    const usuarioSimulado = {
      id: "123",
      user_metadata: { avatar_url: "https://example.com/avatar.jpg" },
    };

    supabase.auth.getUser.mockResolvedValue({ data: { user: usuarioSimulado } });
    supabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });

    const TestComponent = () => {
      const { user, avatarUrl } = useAuth();
      return (
        <div>
          <span data-testid="user-id">{user?.id}</span>
          <span data-testid="avatar-url">{avatarUrl}</span>
        </div>
      );
    };

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("user-id")).toHaveTextContent("123");
    expect(screen.getByTestId("avatar-url")).toHaveTextContent(
      "https://example.com/avatar.jpg"
    );
  });

  it("maneja el cierre de sesión correctamente", async () => {
    const usuarioSimulado = {
      id: "123",
      user_metadata: { avatar_url: "https://example.com/avatar.jpg" },
    };

    supabase.auth.getUser.mockResolvedValue({ data: { user: usuarioSimulado } });
    supabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    supabase.auth.signOut.mockResolvedValue({});

    const ComponenteDePrueba = () => {
      const { user, logout } = useAuth();
      return (
        <div>
          <span data-testid="user-id">{user?.id}</span>
          <button onClick={logout} data-testid="logout-button">
            Cerrar sesión
          </button>
        </div>
      );
    };

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <ComponenteDePrueba />
          </AuthProvider>
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("user-id")).toHaveTextContent("123");

    await act(async () => {
      fireEvent.click(screen.getByTestId("logout-button"));
    });

    expect(supabase.auth.signOut).toHaveBeenCalled();

    expect(screen.queryByTestId("user-id")).toHaveTextContent("");

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
