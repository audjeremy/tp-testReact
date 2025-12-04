describe("Formulaire - gestion des erreurs", () => {
  it("affiche un message d'erreur quand un champ requis est vide", () => {
    cy.visit("/form");

    // On laisse le prénom vide mais on marque le champ comme touché
    cy.get('[data-testid="first-name-input"]').click().blur();

    // On remplit les autres champs pour isoler l'erreur sur le prénom
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("jane.doe@example.com");
    cy.get('input[name="contact"]').type("123-456-7890");
    cy.get('input[name="address1"]').type("1 rue Principale");
    cy.get('input[name="address2"]').type("App 2");

    cy.get('[data-testid="submit-profile-form"]').click();

    // Vérifie que l'aide contextuelle d'erreur s'affiche pour le prénom
    cy.get('[data-testid="first-name-input"]')
      .closest(".MuiFormControl-root")
      .find(".MuiFormHelperText-root")
      .should("contain.text", "required");
  });
});
