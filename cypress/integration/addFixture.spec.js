describe('add a fixture', () => {
    it('can add a new fixture', () => {
        cy.intercept('GET', '/fixtures').as('allFixtures')

        cy.fixture('fixture').then((json) => {
            cy.request('POST', '/fixture', json).then((response) => {
                expect(response.status).to.equal(202)
                expect(response).to.have.property('duration')
                cy.wrap(response.duration).then((duration) => {
                    cy.wait(secondsToMillis(duration + 1))
                })
            })
        })

        cy.request('/fixture/4').should((response) => {
            expect(response.status).be.equal(200)
            expect(response.body.footballFullState).to.have.property('teams')
            expect(response.body.footballFullState.teams[0]).to.have.property('teamId', 'HOME')
        })
    })

    it('can update the new fixture', () => {
        cy.fixture('fixtureUpdate').then((json) => {
            cy.request('PUT', '/fixture', json)
        })

        cy.request('/fixture/4').should((response) => {
            expect(response.status).be.equal(200)
            expect(response.body.footballFullState).to.have.property('goals')
            expect(response.body.footballFullState.goals).to.have.length(2)
            expect(response.body.footballFullState.goals[1]).to.have.property('clockTime', 5260)
            expect(response.body.footballFullState.goals[1]).to.have.property('confirmed', true)
            expect(response.body.footballFullState.goals[1]).to.have.property('id', 366523)
            expect(response.body.footballFullState.goals[1]).to.have.property('ownGoal', false)
            expect(response.body.footballFullState.goals[1]).to.have.property('penalty', false)
            expect(response.body.footballFullState.goals[1]).to.have.property('period', 'SECOND_HALF')
            expect(response.body.footballFullState.goals[1]).to.have.property('playerId', 356262)
            expect(response.body.footballFullState.goals[1]).to.have.property('teamId', 1)
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

// from index.js
const secondsToMillis = seconds => seconds * 1000;