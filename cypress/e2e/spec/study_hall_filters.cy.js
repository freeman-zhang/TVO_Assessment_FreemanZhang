describe('study hall filter', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) //stop printing xhr requests
        cy.visit('https://tvolearn.com')
        cy.viewport(1280, 720) //desktop view

        //go to kindergarten page
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('All Grades').click()
    })

    afterEach(() => {
        //clear all filters after each test to reset filters
        cy.get('.usf-clear-all').contains('Clear all').click()
        cy.get('.usf-label').contains('Filters').should('not.exist')
    })

    it('language works', () => {
        cy.get('.usf-btn').contains('English').click()
        cy.get('.usf-refineby__body').should('contain', 'English')
        cy.get('.usf-btn').contains('French').click()
        cy.get('.usf-refineby__body').should('contain', 'French')


    });


});