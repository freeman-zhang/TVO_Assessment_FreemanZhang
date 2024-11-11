var subjects = ['Mathematics', 'Language', 'Science & Technology', 'History & Geography', 'The Arts', 'Health & Physical Education', 'French as a Second Language']

describe('Verify activity links for', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) //stop printing xhr requests
        cy.visit('https://tvolearn.com')
        cy.viewport(1280, 720) //desktop view
    })

    it('Grade 7 content works', () => {
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade 7').click()

        cy.wrap(subjects).each((subject) => {
            //go to subject page
            cy.get('.button-subject-name').contains(subject).click()

            //test learning activity links work
            cy.get('.tabla').find('a').first().click()
            cy.get('.la-menu').should('be.visible')
            //navigating through side menu
            cy.get('.la-menu').find('.left-nav-activity.current_activity').nextUntil().each(() => {
                cy.get('.la-menu').should('be.visible')
                cy.get('.la-menu').find('.left-nav-activity.current_activity').next().find('a').click()
            })

            //check if the current activity is the last one
            cy.get('.la-menu').find('.left-nav-activity.current_activity').next().should('not.exist')

            //go back to grade page
            cy.get('.site-nav__label').contains('Learning Resources').click()
            cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade 7').click()
        })
        cy.get('.current').should('contain', 'Grade 7')
    })

    it('Grade 7 subject subsection nav works', () => {
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade 7').click()
        cy.get('.button-subject-name').contains('Mathematics').click()

        //click through sub sections
        cy.get('.tabd.highlighted').nextUntil().each(() => {
            cy.get('#strand-tabs').should('be.visible')
            cy.get('.tabd.highlighted').next().click()
        })

        cy.get('.tabd.highlighted').next().should('not.exist')
    })
})