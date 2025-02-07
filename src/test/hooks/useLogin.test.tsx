import { renderHook, act } from "@testing-library/react-hooks";
import { MemoryRouter, useNavigate } from "react-router-dom";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
  Mock,
} from "vitest";
import useLogin from "../../Hooks/useLogin";
import { supabase } from "@/constants/api";

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
    },
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

    // Simulamos el llenado de los campos de email y password
    act(() => {
      result.current.setEmail("eddytalavera@gmail.com");
      result.current.setPassword("123456");
    });

    // Simulamos el envío del formulario
    await act(async () => {
      await result.current.handleEmailLogin({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    //esperamos que se haya llamado a la función de inicio de sesión con los datos correctos
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "eddytalavera@gmail.com",
      password: "123456",
    });

    expect(navigateMock).toHaveBeenCalledWith("/home");
  });
});
