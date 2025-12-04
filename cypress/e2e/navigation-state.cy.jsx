describe("Navigation multi-pages et persistance de l’état", () => {
  it("conserve le thème sélectionné après navigation", () => {
    cy.visit("/");

    let initialMode;
    let toggledMode;

    const readMode = ($el) => Cypress.$($el).attr("data-theme-mode");

    cy.get('[data-testid="app-root"]').should(($root) => {
      initialMode = readMode($root);
      expect(initialMode, "mode initial").to.exist;
    });

    // On change le thème via le bouton dédié
    cy.get('button[aria-label="toggle theme"]').click();

    cy.get('[data-testid="app-root"]').should(($root) => {
      toggledMode = readMode($root);
      expect(toggledMode, "mode togglé").to.exist;
      expect(toggledMode).to.not.equal(initialMode);
    });

    // Navigation vers une autre page
    cy.get('[data-testid="menu-teams"]').click();
    cy.url().should("include", "/team");

    // Le thème reste celui sélectionné
    cy.get('[data-testid="app-root"]').should(($root) => {
      expect(readMode($root)).to.equal(toggledMode);
    });

    // Retour à la page d'accueil
    cy.go("back");
    cy.url().should("include", "/");

    // L'état de thème persiste toujours
    cy.get('[data-testid="app-root"]').should(($root) => {
      expect(readMode($root)).to.equal(toggledMode);
    });
  });
});
