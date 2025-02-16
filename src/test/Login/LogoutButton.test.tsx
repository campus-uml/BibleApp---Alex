import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import LogoutButton from "../../components/login/LogoutButton"; // Ajusta el path según corresponda
import { AuthContext } from "@/context/AuthContext";
import { describe, it, expect } from "vitest";

const mockLogout = vi.fn();

const mockUser = {
  name: "testUser",
  avatarUrl: "testAvatarUrl",
  id: "testId",
  app_metadata: {},
  user_metadata: {},
  aud: "testAud",
  created_at: "2023-01-01T00:00:00.000Z",
};
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider
    value={{
      logout: mockLogout,
      user: mockUser,
      avatarUrl: mockUser.avatarUrl,
    }}
  >
    {children}
  </AuthContext.Provider>
);

describe("LogoutButton", () => {
  it('debería abrir el modal al hacer clic en el botón "Cerrar sesión"', () => {
    render(<LogoutButton />, { wrapper });

    const logoutButton = screen.getByText(/cerrar sesión/i);
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    expect(screen.getByText(/¿estás seguro\?/i)).toBeInTheDocument();
  });
});
