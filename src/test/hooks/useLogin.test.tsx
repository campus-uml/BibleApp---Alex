import { renderHook, act } from "@testing-library/react-hooks";
import { MemoryRouter, useNavigate } from "react-router-dom";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
  type Mock,
} from "vitest";
import useLogin from "../../Hooks/useLogin";
import { supabase } from "@/constants/api";
import type React from "react"; // Added import for React

// Mock de `useNavigate`
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock de `supabase.auth`
vi.mock("@/constants/api", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signInWithOAuth: vi.fn(),
    },
    from: vi.fn(),
  },
}));

describe("Pruebas en el hook useLogin.ts", () => {
  let navigateMock: ReturnType<typeof useNavigate>;

  beforeEach(() => {
    navigateMock = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("debe hacer inicio de sesión exitoso", async () => {
    (supabase.auth.signInWithPassword as Mock).mockResolvedValue({
      error: null,
    });
    const { result } = renderHook(() => useLogin(), { wrapper: MemoryRouter });
    act(() => {
      result.current.setEmail("eddytalavera@gmail.com");
      result.current.setPassword("123456");
    });
    await act(async () => {
      await result.current.handleEmailLogin({
        preventDefault: () => {},
      } as React.FormEvent);
    });
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "eddytalavera@gmail.com",
      password: "123456",
    });

    expect(navigateMock).toHaveBeenCalledWith("/home");
  });

  test("debe mostrar un error al hacer inicio de sesión", async () => {
    (supabase.auth.signInWithPassword as Mock).mockResolvedValue({
      error: { message: "Error al iniciar sesión" },
    });

    const { result } = renderHook(() => useLogin(), { wrapper: MemoryRouter });
    act(() => {
      result.current.setEmail("invalid@email.com");
      result.current.setPassword("wrongpassword");
    });

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      await result.current.handleEmailLogin({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(alertMock).toHaveBeenCalledWith("Error al iniciar sesión");
    expect(navigateMock).not.toHaveBeenCalled();
  });

  test("debe registrar un nuevo usuario exitosamente", async () => {
    const mockUser = { id: "123" };
    const mockUpsertResponse = { error: null };
    (supabase.auth.signUp as Mock).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const mockFrom = vi.fn().mockReturnValue({
      upsert: vi.fn().mockResolvedValue(mockUpsertResponse),
    });
    (supabase.from as Mock).mockImplementation(mockFrom);

    const { result } = renderHook(() => useLogin(), { wrapper: MemoryRouter });

    let signUpResult;
    await act(async () => {
      signUpResult = await result.current.signUpNewUser(
        "newuser@example.com",
        "password123",
        "New User"
      );
    });

    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: "newuser@example.com",
      password: "password123",
      options: {
        emailRedirectTo: expect.any(String),
      },
    });

    expect(mockFrom).toHaveBeenCalledWith("profiles");
    expect(mockFrom().upsert).toHaveBeenCalledWith({
      id: "123",
      full_name: "New User",
    });

    expect(signUpResult).toEqual({
      success: true,
      message: "Registro exitoso. Por favor, verifica tu email.",
    });
  });

  test("debe manejar errores en el registro de usuario", async () => {
    (supabase.auth.signUp as Mock).mockResolvedValue({
      error: new Error("Error de registro"),
    });

    const { result } = renderHook(() => useLogin(), { wrapper: MemoryRouter });

    let signUpResult;
    await act(async () => {
      signUpResult = await result.current.signUpNewUser(
        "error@example.com",
        "password123",
        "Error User"
      );
    });

    expect(signUpResult).toEqual({
      success: false,
      message: expect.stringContaining("Error al registrarse"),
    });
  });

  test("debe iniciar sesión con GitHub", async () => {
    (supabase.auth.signInWithOAuth as Mock).mockResolvedValue({ error: null });

    const { result } = renderHook(() => useLogin(), { wrapper: MemoryRouter });

    await act(async () => {
      await result.current.handleGithubLogin();
    });

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "github",
      options: {
        redirectTo: expect.any(String),
      },
    });
  });

  test("debe iniciar sesión con Google", async () => {
    (supabase.auth.signInWithOAuth as Mock).mockResolvedValue({ error: null });

    const { result } = renderHook(() => useLogin(), { wrapper: MemoryRouter });

    await act(async () => {
      await result.current.handleGoogleLogin();
    });

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: expect.any(String),
      },
    });
  });

  test("debe manejar errores en inicio de sesión con OAuth", async () => {
    (supabase.auth.signInWithOAuth as Mock).mockResolvedValue({
      error: new Error("Error de OAuth"),
    });

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    const { result } = renderHook(() => useLogin(), { wrapper: MemoryRouter });

    await act(async () => {
      await result.current.handleGithubLogin();
    });

    expect(alertMock).toHaveBeenCalledWith("Error logging in with GitHub");

    alertMock.mockClear();

    await act(async () => {
      await result.current.handleGoogleLogin();
    });

    expect(alertMock).toHaveBeenCalledWith("Error logging in with Google");
  });
});
