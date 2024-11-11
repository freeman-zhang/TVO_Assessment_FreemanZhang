Tests are in filepath /cypress/e2e/spec/

Notes: 
- Imported cypress-each for easier implementation. Import statement is in cypress/support/e2e.js
- Grade 8 Science and Technology (Bug?): When testing all the subject cards for all grades, I noticed that grade 8 Science and Technology card was behaving weirdly on cypress. Upon inspection, it seems like the DOM for this card is duplicated and placed on top of another. Had to force click it to proceed with tests. See image below.
![image](https://github.com/user-attachments/assets/cff532e7-a04f-4987-8f3b-0be9d5245be7)
- Grade 1 to 6 content tests: I only wrote the tests for grade 1 content because it is repeated for grades 2-6. I left it out because if I were to put it all in one file, the that test file would take 30 mins to complete. And I only had 10 tests, so I chose to omit the rest for simplicity. 
- Grade 1 to 8 subject tabs: For each subject from grade 1 to 8, there are multiple sub sections per subject. The testing for those is the same with one adding tab click, so I omitted it due to redundancy for the sake of the assessment. In a work setting, I would include it

