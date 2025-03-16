describe('Issue delete', () => {
    const issueTitle = 'This is an issue of type: Task.'; // Moved inside describe & fixed syntax

    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board');
        // Open issue detail modal with title
        cy.contains(issueTitle).click();
      });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should delete issue successfully', () => {
        // Add steps to delete issue
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete issue')
            .click()
            .should('not.exist');
        cy.get('[data-testid="board-list:backlog"]')
            .should('be.visible')
        cy.contains(issueTitle).should('not.exist')
    });

    it.only('Should cancel issue deletion', function () {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]')
          .contains('button', 'Cancel')
          .click()
          .should('not.exist'); 
          cy.get('[data-testid="icon:close"]').first().click();  
        cy.get('[data-testid="board-list:backlog"]').should('be.visible');
        cy.contains(issueTitle).should('be.visible');
      });
        });