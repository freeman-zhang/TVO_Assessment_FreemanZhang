describe('Verify TVO Navigation Header', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) //stop printing xhr requests
        cy.visit('https://tvolearn.com')
        cy.viewport(1280, 720) //desktop view
    })

    it('Learning resources dropdown works', () => {
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').should('be.visible')

    })

    it('Learning resources dropdown links works', () => {
        //kindergarten
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Kindergarten').click()
        cy.get('.current').should('contain', 'Kindergarten')

        //grade 1-8
        var grades1to8 = Array.from({ length: 8 }, (v, k) => k + 1)
        cy.wrap(grades1to8).each((grade) => {
            cy.get('.site-nav__label').contains('Learning Resources').click()
            cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade ' + grade).click()
            cy.get('.current').should('contain', 'Grade ' + grade)
        })

        //grade 9-12
        var grades9to12 = [9, 10, 11, 12]
        cy.wrap(grades9to12).each((grade) => {
            cy.get('.site-nav__label').contains('Learning Resources').click()
            cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade ' + grade).click()
            cy.get('.current').should('contain', 'Courses')
        })

        //All grades
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('All Grades').click()
        cy.get('.current').should('contain', 'Courses')
    })


})