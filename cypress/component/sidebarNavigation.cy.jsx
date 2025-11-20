import React from "react";
import { mount } from "../support/component";
import Sidebar from "../../src/scenes/global/Sidebar";

describe("Sidebar – navigation", () => {
  it("active l'item Manage Team quand on clique dessus", () => {
    mount(<Sidebar />);

    // On clique sur l’item "Manage Team"
    cy.findByRole("listitem", { name: /go to manage team/i }).click();

    // On vérifie qu'il est bien actif (classe CSS)
    cy.findByRole("listitem", { name: /go to manage team/i })
      .should("have.class", "pro-menu-item")
      .and("have.class", "active");
  });
});