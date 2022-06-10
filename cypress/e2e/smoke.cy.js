describe('Smoke Test', () => {
    it('can visit the home page', () => {
        cy.visit('/');
        cy.contains(/learn react/i);
    });
});
