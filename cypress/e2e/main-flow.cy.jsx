describe("Parcours principal", () => {
  it("permet à l’utilisateur de faire l’action principale", () => {
    // Grâce à baseUrl, pas besoin de mettre l’URL complète
    cy.visit("/");

    // 👉 Adapte ces assertions à ton TP (titres, boutons, etc.)
    cy.contains(/dashboard/i).should("exist"); // ex : titre page d'accueil

    // Exemple : aller vers une page de liste
    // remplace par un vrai sélecteur de ton app (data-testid, texte, etc.)
    cy.get('[data-testid="menu-teams"]').click();

    // Exemple : vérifier que la page se charge
    cy.url().should("include", "/team");
    cy.contains(/team/i).should("exist");
  });
});
