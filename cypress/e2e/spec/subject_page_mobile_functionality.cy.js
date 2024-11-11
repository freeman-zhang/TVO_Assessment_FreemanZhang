const grade = 1
const subject = 'Mathematics'
describe('subject mobile page', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }) //stop printing xhr requests
        cy.visit('https://tvolearn.com')
        cy.viewport(360, 780) //desktop view

        cy.get('.site-header__icons').find('.site-header__menu.js-mobile-nav-toggle').click()
        cy.get('[data-target="learning-resources-k-12-1"]').click();
        cy.get('.mobile-nav__label').contains('Grade ' + grade).click();
        cy.get('.button-subject-name').contains(subject).click();
    });

    it('navigation works', () => {
        cy.get('.current').should('contain', subject);
        cy.get('.current').prev().should('contain', 'Grade ' + grade);
    });

    it('shows expected sections', () => {
        //check to see if necessary section headers are included
        cy.get('.shogun-heading-component').should('contain', 'Grade ' + grade)
            .and('contain', subject)
            .and('contain', 'How to Use These Resources')
            .and('contain', 'Curriculum Overview')
            .and('contain', 'Resources for Learning')
            .and('contain', 'Apply the Learning')
            .and('contain', 'Vocabulary');
    });

    it('learning activity is not allowed', () => {
        //learning activities don't work on mobile
        cy.get('.strands-top-box').find('p').should('contain', 'To access this learning activity, please visit this page in a desktop or tablet browser.')
    });

    it('resources for learning links work', () => {
        cy.get('#resources').children().each((el) => {
            cy.get(el).find('a').should('exist');
        })
    });

    it('stay connected section is working', () => {
        cy.get('#mc_embed_signup').should('exist');
        //errors when empty email - quick check to see button/submit works
        cy.get('#mc-embedded-subscribe').click();
        cy.get('.mce_inline_error').should('be.visible').and('contain', 'This field is required.');
        //I am not testing for email validity as that should be tested when testing the email component
        //Also I am not checking for email submission as I dont have access to the backend to verify
    });

    it('feedback button works', () => {
        cy.get('.feedback-modal__body').should('not.be.visible');
        cy.get('#feedbackButton').click();
        cy.get('.feedback-modal__body').should('be.visible');
    });

    it('footer is rendered', () => {
        cy.get('.site-footer').should('be.visible');
    });

    it('header is rendered and working', () => {
        cy.get('.site-header__logo').should('be.visible');

        //check learning resources navigation
        cy.get('.site-header__icons').find('.site-header__menu.js-mobile-nav-toggle').click();
        cy.get('[data-target="learning-resources-k-12-1"]').click();
        cy.get('[data-parent="learning-resources-k-12-1"].mobile-nav__dropdown').should('be.visible');

        //check collaboration navigation
        //need a wait because when going back to fast, the menu doesn't load correctly
        cy.get('[data-parent="learning-resources-k-12-1"].mobile-nav__dropdown').find('.mobile-nav__return-btn').click().wait(500);
        cy.get('[data-target="collaborations-2"]').should('be.visible');
        cy.get('[data-target="collaborations-2"]').click();
        cy.get('[data-parent="collaborations-2"].mobile-nav__dropdown').should('be.visible');

        //search bar still works
        cy.get('.site-header__icons').find('.site-header__search-toggle').click();
        cy.get('#SearchDrawer').should('be.visible');
    });

    //test errors - cypress detects uncaught errors originating from your application
    //Failed to execute 'querySelector' on 'Document': '#' is not a valid selector.
    it('back to top button works', () => {
        cy.scrollTo("bottom");
        cy.get('#bttopBtn').should('be.visible')
        cy.get('#bttopBtn').click();
        cy.window().its("scrollY").should("eq", 0);
    });
});