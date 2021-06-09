describe('add a fixture', () => {
    it('can add a new fixture', () => {
        cy.fixture('fixture').then((json) => {
            cy.request('POST', '/fixture', json)
        })

        cy.request('/fixture/4').as('newFixture')

        cy.get('@newFixture').should((response) => {
            expect(response.status).be.equal(200)
            expect(response.body).to.have.property('teams')
            expect(response.body.teams).to.be.instanceOf(Array)
            expect(response.body.teams[0]).to.have.property('teamId', 'HOME')
        })
    })

    after(() => {
        cy.request('DELETE', '/fixture/4')
    })
})