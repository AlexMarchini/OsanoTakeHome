
export const clickHomepageLink = () => {
    cy.findByRole('link', {name: 'Amazon'}).click()
}

export const search = (searchTerm) => {
    cy.findByLabelText('Search Amazon').type(searchTerm)
    cy.findByLabelText('Go').click()
};

export const selectSearchResultByIndex = (index) => {
    cy.get('[data-component-type="s-search-result"]').then(searchResults => {
        cy.wrap(searchResults[index]).within(() => {
            cy.findAllByRole('link').first().click()
        })
    });
}

export const selectDealOfTheDay = () => {
    cy.get('.deal-of-the-day').click()
}

export const seeAllDeals = () => {
    cy.findAllByRole('link', {name: 'See all deals'}).first().click()
}

export const selectProductFromCarouselByIndex = (carouselIndex) => {
    const carouselId = `#desktop-${carouselIndex}`
    cy.get(carouselId).within(() => {
        cy.findAllByRole('listitem').first().click()
    })
}

export const searchForProductAndAddToCart = (searchTerm, index) => {
    search(searchTerm)
    selectSearchResultByIndex(index)
    cy.findByRole('button', {name: 'Add to Cart'}).click()
}

export const addFirstRecommendedToCart = () => {
    // Would want to find a better way of extracting different carousel sections
    cy.findByText('Bargain recommendations').parent().parent().parent().within(() => {
        cy.findAllByRole('button', {name: 'Add to Cart'}).first().click()
    })
}

export const goToCart = () => {
    cy.findByLabelText(/items in cart/).click()
}

export const changeCartQtyByIndex = (index, quantity) => {
    cy.findAllByLabelText('Quantity').then(qtyDropdowns => {
        qtyDropdowns[index].click({force: true})
    })
    cy.get(`[aria-labelledby="quantity_${quantity}"]`).click()
}

export const deleteFirstItemFromCart = () => {
    cy.get('#sc-cart-column').within(() => {
        cy.findAllByRole('button', {name: /Delete/}).first().click()
    })
}
