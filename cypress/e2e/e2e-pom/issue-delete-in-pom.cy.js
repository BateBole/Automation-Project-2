/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => { 
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        // Open issue detail modal with title
        cy.contains(issueTitle).click();
      });
  });
 
  const issueTitle = 'This is an issue of type: Task.';
  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
 
  it('Should delete issue successfully', () => {
    // Add steps to delete issue
      cy.get(IssueModal.deleteButton).click();
      cy.get(IssueModal.confirmationPopup).should('be.visible');
    
      cy.get(IssueModal.confirmationPopup).within(() => {
      cy.contains(IssueModal.deleteButtonName).click();
    });

    cy.get(IssueModal.confirmationPopup).should('not.exist');
    cy.get(IssueModal.backlogList).should('be.visible');

    cy.contains(issueTitle).should('not.exist');
  });


  it('Should cancel deletion process successfully', () => {
    // Add steps to start deletion process but cancel it
    cy.get(IssueModal.deleteButton).click();
        cy.get(IssueModal.confirmationPopup)
          .contains('button', 'Cancel')
          .click()
          .should('not.exist'); 
          cy.get(IssueModal.closeDetailModalButton).first().click();  
        cy.get(IssueModal.backlogList).should('be.visible');
        cy.contains(issueTitle).should('be.visible');
  });
});