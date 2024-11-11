const grade = 1
const subject = 'Mathematics'
describe('subject page', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false }); //stop printing xhr requests
        cy.visit('https://tvolearn.com');
        cy.viewport(1280, 720); //desktop view

        cy.get('.site-nav__label').contains('Learning Resources').click();
        cy.get('#SiteNavLabel-learning-resources-k-12').find('.site-nav__label').contains('Grade ' + grade).click();
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

    it('different subsubject tabs works', () => {
        cy.get('.tabd.highlighted').nextUntil().each(() => {
            cy.get('#strand-tabs').should('be.visible');
            cy.get('.tabd.highlighted').next().click();
        })

        cy.get('.tabd.highlighted').next().should('not.exist');
    });

    it('can navigate to the end of a set of learning activities', () => {
        cy.get('.tabla').find('a').first().click();
        cy.get('.la-menu').should('be.visible');
        //navigating through side menu
        cy.get('.la-menu').find('.left-nav-activity.current_activity').nextUntil().each(() => {
            cy.get('.la-menu').should('be.visible');
            cy.get('.la-menu').find('.left-nav-activity.current_activity').next().find('a').click();
        })

        //check if the current activity is the last one
        cy.get('.la-menu').find('.left-nav-activity.current_activity').next().should('not.exist');
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
        cy.get('.site-header__logo-image').should('be.visible');
        cy.get('.site-nav__label').contains('Learning Resources').click();
        cy.get('#SiteNavLabel-learning-resources-k-12').should('be.visible');
        cy.get('.site-nav__label').contains('Collaborations').click();
        cy.get('#SiteNavLabel-collaborations').should('be.visible');
        cy.get('#SiteNav').find('.site-header__search-toggle').click();
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