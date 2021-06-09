import fixtures from '../../data/fixtures'

describe('get all fixtures', () => {
    it('should get all fixtures', () => {
        cy.request('/fixtures').as('fixtures')

        // this will make sure that the /fixtures response deeply equals the data you provided
        cy.get('@fixtures').its('body').should('deep.equal', fixtures)

        // below are the more in depth checks
        cy.get('@fixtures').should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.length(3)
            response.body.forEach((fixture) => {
                expect(fixture).to.have.property('fixtureId')
                assert.isString(fixture.fixtureId)
            })
        })
    })
})