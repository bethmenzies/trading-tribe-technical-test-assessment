import fixtures from '../../data/fixtures'

describe('get all fixtures', () => {
    it('should get all fixtures', () => {
        cy.request('/fixtures').its('body').should('deep.equal', fixtures)
    })
})