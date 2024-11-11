Tests are in filepath /cypress/e2e/spec/
10 functionality tests for subject page are in /cypress/e2e/spec/subject_page_functionality.cy.js
similar tests for mobile page are in /cypress/e2e/spec/subject_page_mobile_functionality.cy.js

**Test Approach:**
I wanted to test for the basic functionality of all clickable buttons and ensure that the flow of learning activities was working. I also made sure to check that things that should work across the whole platform worked on this page as well, such as the header, footer, return to top button and feedback modal. I also wrote basic tests to ensure that necessary section headers were included on the page, such as grade level, subject, learning activities, resources, and vocabulary.

**Test Cases**
- Basic navigation to the page
- Expected section headers were present
- Learning activities subsections were clickable
- Learning activity links worked and you were able to navigate to the end
- _(Mobile Only)_ Learning activities were disabled
- Resources for learning links worked
- Stay connected section works
- Feedback button will bring up modal
- Footer is rendered
- Header and logo is rendered and is still working on this page

**Execution results**
All tests are working as intended. Except test for the return to top button. Cypress test fails stating that "an uncaught error originating from your application" was found - "Failed to execute 'querySelector' on 'Document': '#' is not a valid selector". I chose to ignore this as the test case should be working, but Cypress stated a code error, so I let this test fail.


Beyond these 10 tests, I originally did tests for the whole navigation flow, including all other grades and subjects. They are in the other test files; feel free to disregard them or take a look.

Notes: 
- Imported cypress-each for easier implementation. Import statement is in cypress/support/e2e.js
- Grade 8 Science and Technology (Bug?): When testing all the subject cards for all grades, I noticed that grade 8 Science and Technology card was behaving weirdly on cypress. Upon inspection, it seems like the DOM for this card is duplicated and placed on top of another. Had to force click it to proceed with tests. See image below.
![image](https://github.com/user-attachments/assets/cff532e7-a04f-4987-8f3b-0be9d5245be7)

