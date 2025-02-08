/// <reference types="cypress" />

describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("deberia mostrarse formulario de registro", () => {
    cy.get("input#full-name").should("be.visible");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get("input#confirm-password").should("be.visible");
    cy.get("button[type='submit']").should("be.visible").contains("Regístrate");
  });

  it("deberia lanzar un error cuando las claves no sean identicas", () => {
    cy.get("input#full-name").type("Juan Pérez");
    cy.get("input#email").type("juan@example.com");
    cy.get("input#password").type("Password123!");
    cy.get("input#confirm-password").type("DifferentPass!");
    cy.get("button[type='submit']").click();
    cy.contains("Las contraseñas no coinciden").should("be.visible");
  });

  it("deberia arrojar un error si no se ingresa un nombre", () => {
    cy.get("input#email").type("juan@example.com");
    cy.get("input#password").type("Password123!");
    cy.get("input#confirm-password").type("Password123!");
    cy.get("button[type='submit']").click();
    cy.contains("El nombre completo es obligatorio").should("be.visible");
  });

  it("deberia enviar los datos", () => {
    cy.intercept("POST", "/api/register", {
      statusCode: 200,
      body: { success: true, message: "Registro exitoso" },
    });

    cy.get("input#full-name").type("Juan Pérez");
    cy.get("input#email").type("juan@example.com");
    cy.get("input#password").type("Password123!");
    cy.get("input#confirm-password").type("Password123!");
    cy.get("button[type='submit']").click();

    cy.contains("Éxito").should("be.visible");
    cy.contains("Registro exitoso").should("be.visible");
  });
});
