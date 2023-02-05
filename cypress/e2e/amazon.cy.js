import { clickHomepageLink,
         search,
         selectSearchResultByIndex,
         selectProductFromCarouselByIndex,
         selectDealOfTheDay,
         seeAllDeals,
         searchForProductAndAddToCart,
         addFirstRecommendedToCart,
         goToCart,
         changeCartQtyByIndex,
         deleteFirstItemFromCart }
         from '../support/flows/amazonFlow';

describe('Amazon', () => {
    beforeEach(() => {
        cy.viewport('macbook-16')
        cy.visit('https://amazon.com');
    });

    it('can search for a product', () => {
        const searchTerm = 'bike'
        search(searchTerm)
        // Simple way to make sure the search results are relevant
        cy.findAllByText(new RegExp(searchTerm)).should('have.length.greaterThan', 0)
        selectSearchResultByIndex(2)
        // Simple way of asserting we're on the product page
        cy.findAllByRole('button', {name: 'Add to Cart'}).should('have.length.greaterThan', 0)
    });

    it('can view deals and products from the homepage', () => {
        selectDealOfTheDay()
        cy.url().should('include', '/deal/')
        clickHomepageLink()
        seeAllDeals()
        cy.findAllByText('Today\'s Deals').should('have.length.greaterThan', 0)
        clickHomepageLink()
        selectProductFromCarouselByIndex(1)
        cy.findAllByRole('button', {name: 'Add to Cart'}).should('have.length.greaterThan', 0)
    });

    it('can modify cart contents', () => {
        const searchTerm = "bike"
        searchForProductAndAddToCart(searchTerm, 2)
        cy.findAllByText('Added to Cart').should('have.length.greaterThan', 0)
        addFirstRecommendedToCart()
        cy.findAllByText('Added to Cart').should('have.length.greaterThan', 0)
        goToCart()
        cy.findAllByText('Subtotal (2 items):').should('have.length.greaterThan', 0)
        changeCartQtyByIndex(0, 5)
        cy.findAllByText('Subtotal (6 items):').should('have.length.greaterThan', 0)
        deleteFirstItemFromCart()
        cy.findAllByText('Subtotal (1 item):').should('have.length.greaterThan', 0)
    })

});