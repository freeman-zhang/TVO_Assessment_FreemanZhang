var subjects = ['Demonstrating Literacy and Mathematics Behaviours', 'Belonging and Contributing', 'Self-Regulation and Well-Being', 'Problem Solving and Innovating']

describe('Verify Kindergarten Subject', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) //stop printing xhr requests
        cy.visit('https://tvolearn.com')
        cy.viewport(1280, 720) //desktop view

        //go to kindergarten page
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Kindergarten').click()
    })

    it.each(subjects)('%s content works', (subject) => {
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
    })
})