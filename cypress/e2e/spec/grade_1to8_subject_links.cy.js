const grades = Array.from({ length: 6 }, (v, k) => k + 1)

describe('Verify subject links for', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) //stop printing xhr requests
        cy.visit('https://tvolearn.com')
        cy.viewport(1280, 720) //desktop view

        //go to kindergarten page
        cy.get('.site-nav__label').contains('Learning Resources').click()
    })

    it.each(grades)('Grade %s works', (grade) => {
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade ' + grade).click()

        //subjects being entered manually. Ideally subjects are taken from the database so we don't have to update this list manually
        var subjects = ['Mathematics', 'Language', 'Science & Technology', 'Social Studies', 'The Arts', 'Health & Physical Education']
        //slight differences between subject name and breadcrumb name
        var subject_crumbs = ['Mathematics', 'Language', 'Science and Technology', 'Social Studies', 'The Arts', 'Physical Education and Health']

        cy.wrap(subjects).each((subject, index) => {
            //go to subject page then back to grade page
            cy.get('.button-subject-name').contains(subject).click()
            cy.get('.current').should('contain', subject_crumbs[index])
            cy.get('.current').prev().click() //go back a page using breadcrumbs
        })
    })

    it('Grade 7 works', () => {
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade 7').click()

        //subjects being entered manually. Ideally subjects are taken from the database so we don't have to update this list manually
        var subjects = ['Mathematics', 'Language', 'Science & Technology', 'History & Geography', 'The Arts', 'Health & Physical Education', 'French as a Second Language']
        //slight differences between subject name and breadcrumb name
        var subject_crumbs = ['Mathematics', 'Language', 'Science and Technology', 'History and Geography', 'The Arts', 'Physical Education and Health', 'French as a Second Language']

        cy.wrap(subjects).each((subject, index) => {
            //go to subject page then back to grade page
            cy.get('.button-subject-name').contains(subject).click()
            cy.get('.current').should('contain', subject_crumbs[index])
            cy.get('.current').prev().click() //go back a page using breadcrumbs
        })
    })

    //Separate test for grade 8, because Science and Technology button in grade 8 is duplicated and covered by itself making cypress unable to click it
    it('Grade 8 works', () => {
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade 8').click()

        //subjects being entered manually. Ideally subjects are taken from the database so we don't have to update this list manually
        var subjects = ['Mathematics', 'Language', 'Science & Technology', 'History & Geography', 'The Arts', 'Health & Physical Education', 'French as a Second Language']
        //slight differences between subject name and breadcrumb name
        var subject_crumbs = ['Mathematics', 'Language', 'Science and Technology', 'History and Geography', 'The Arts', 'Physical Education and Health', 'French as a Second Language']

        cy.wrap(subjects).each((subject, index) => {
            //go to subject page then back to grade page
            cy.get('.button-subject-name').contains(subject).click({ force: true }) //using force:true to click on covered element
            cy.get('.current').should('contain', subject_crumbs[index])
            cy.get('.current').prev().click() //go back a page using breadcrumbs
        })
    })


})