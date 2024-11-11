describe('Verify Kindergarten Page', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) //stop printing xhr requests
        cy.visit('https://tvolearn.com')
        cy.viewport(1280, 720) //desktop view

        //go to kindergarten page
        cy.get('.site-nav__label').contains('Learning Resources').click()
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Kindergarten').click()
    })

    it('Subject links works', () => {
        //subjects being entered manually. Ideally subjects are taken from the database so we don't have to update this list manually
        var subjects = ['Demonstrating Literacy and Mathematics Behaviours', 'Belonging and Contributing', 'Self-Regulation and Well-Being', 'Problem Solving and Innovating']
        //slight differences between subject name and breadcrumb name
        var subject_crumbs = ['Demonstrating Literacy and Mathematical Behaviours', 'Belonging and Contributing', 'Self-Regulation and Well-Being', 'Problem Solving and Innovating']

        cy.wrap(subjects).each((subject, index) => {
            //go to subject page then back to kindergarten page
            cy.get('.button-subject-name').contains(subject).click()
            cy.get('.current').should('contain', subject_crumbs[index])
            cy.get('.current').prev().click() //go back a page using breadcrumbs
        })
    })

})