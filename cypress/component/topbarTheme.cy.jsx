import React from "react";
import { mount } from "../support/component";
import Topbar from "../../src/scenes/global/Topbar";

describe("Topbar - toggle theme", () => {
  it("bascule le thème au clic", () => {
    mount(<Topbar />);

    cy.findByRole("button", { name: /toggle theme/i }).click();

    // Pour l'instant on vérifie juste que le bouton existe toujours
    cy.findByRole("button", { name: /toggle theme/i }).should("exist");
  });
});