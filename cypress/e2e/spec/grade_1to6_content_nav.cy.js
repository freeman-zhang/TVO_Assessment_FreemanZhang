const grades = Array.from({ length: 6 }, (v, k) => k + 1)
var subjects = ['Mathematics', 'Language', 'Science & Technology', 'Social Studies', 'The Arts', 'Health & Physical Education']

describe('Verify activity links for', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) //stop printing xhr requests
        cy.visit('https://tvolearn.com')
        cy.viewport(1280, 720) //desktop view
    })

    //Only doing grade 1 content for now because grade 1 to 6 would talk 30 mins to run
    //would want to create separate tests to run in parellel
    it('Grade 1 content works', () => {
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade 1').click()

        cy.wrap(subjects).each((subject) => {
            //go to subject page
            cy.get('.button-subject-name').contains(subject).click()

            //test learning activity links work
            cy.get('.tabla').find('a').first().click()
            cy.get('.la-menu').should('be.visible')
            //navigating through side menu
            cy.get('.la-menu').find('.left-nav-activity.current_activity').nextUntil().each((el) => {
                cy.get('.la-menu').should('be.visible')
                cy.get('.la-menu').find('.left-nav-activity.current_activity').next().find('a').click()
            })

            //check if the current activity is the last one
            cy.get('.la-menu').find('.left-nav-activity.current_activity').next().should('not.exist')

            //go back to grade page
            cy.get('.site-nav__label').contains('Learning Resources').click()
            cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade 1').click()
        })
        cy.get('.current').should('contain', 'Grade 1')
    })
})