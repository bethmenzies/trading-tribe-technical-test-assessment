describe('add a fixture', () => {
    it('can add a new fixture', () => {
        cy.intercept('GET', '/fixtures').as('allFixtures')

        cy.fixture('fixture').then((json) => {
            cy.request('POST', '/fixture', json)
        })

        cy.wait(60000)
        cy.request('/fixture/4').as('newFixture')

        cy.get('@newFixture').should((response) => {
            expect(response.status).be.equal(200)
            expect(response.body.footballFullState).to.have.property('teams')
            expect(response.body.footballFullState.teams[0]).to.have.property('teamId', 'HOME')
        })
    })

    it('can update the new fixture', () => {
        cy.fixture('fixtureUpdate').then((json) => {
            cy.request('PUT', '/fixture', json)
        })

        cy.request('/fixture/4').as('newFixture')

        cy.get('@newFixture').should((response) => {
            expect(response.status).be.equal(200)
            expect(response.body.footballFullState).to.have.property('goals')
            expect(response.body.footballFullState.goals).to.have.length(2)
            expect(response.body.footballFullState.goals[1]).to.have.property('clockTime', 5260)
        })
    })

    it('can delete the new fixture', () => {
        cy.request('DELETE', '/fixture/4')

        cy.request('/fixtures').should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.length(3)
        })
    })
})