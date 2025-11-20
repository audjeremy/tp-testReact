import React from "react";
import { mount } from "../support/component";
import Team from "../../src/scenes/team";

describe("Team filter - Zod validation", () => {
  it("affiche une erreur si le filtre est trop court (Zod)", () => {
    mount(<Team />);

    // Tape 1 caractère → erreur Zod
    cy.findByLabelText("team filter").type("a");

    cy.findByRole("alert")
      .should("exist")
      .and("contain.text", "Please enter at least 2 characters");
  });

  it("retire l'erreur quand l'input devient valide", () => {
  mount(<Team />);

  // 1 char → erreur
  cy.findByLabelText("team filter").type("a");
  cy.findByRole("alert").should("exist");

  // On ajoute un 2e caractère → input valide
  cy.findByLabelText("team filter").type("b");

  // L'erreur disparaît
  cy.findByRole("alert").should("not.exist");
});
});