describe('Listing Restaurants', () => {
    it('shows restaurants from the server', () => {
        const saladPlace = 'Green Place';
        const pizzaPlace = 'Pizza Place';

        cy.intercept('GET', ' https://api.outsidein.dev/*/restaurants   ', [
            {id: 1, name: saladPlace},
            {id: 2, name: pizzaPlace},
        ]);

        cy.visit('/');
        cy.contains(saladPlace);
        cy.contains(pizzaPlace);
    });
});
