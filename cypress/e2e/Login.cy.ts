/// <reference types="cypress" />

describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Debería cargar la página de login", () => {
    cy.contains("Inicia sesión para continuar").should("be.visible");
  });

  it("Debería permitir escribir email y contraseña", () => {
    cy.get('input[type="email"]').type("usuario@example.com");
    cy.get('input[type="password"]').type("123456");
  });

  it("El botón de login debería estar habilitado después de escribir", () => {
    cy.get('input[type="email"]').type("usuario@example.com");
    cy.get('input[type="password"]').type("123456");
    cy.get("button[type='submit']").should("not.be.disabled");
  });

  it("Debe mostrar los términos y permitir aceptar", () => {
    cy.visit("/terminos");
    cy.contains("Términos y Servicios").should("be.visible");
    cy.contains("Acepto los Términos y Servicios").click();
    cy.url().should("include", "/login");
  });

  it("Debería permitir hacer login", () => {
    cy.get('input[type="email"]').type("eddytalavera073@gmail.com");
    cy.get('input[type="password"]').type("123456");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/home");
  });
});
