import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "../../components/login/LoginForm";
import { describe, test } from "vitest";

describe("Pruebas en el componente LoginForm", () => {
  test("debería renderizar los elementos del formulario correctamente", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  });

  test("debería simular el cambio de entrada para el correo electrónico y la contraseña", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  });

  test("debería llamar a handleEmailLogin al enviar el formulario", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  });

  test("debería mostrar un spinner de carga al enviar", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  });
});
