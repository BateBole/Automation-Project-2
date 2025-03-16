import IssueModal from "../pages/IssueModal";

describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create a comment successfully', () => {
        IssueModal.addNewComment();
        IssueModal.verifyComment();
    })

    it('Should edit a comment successfully', () => {
        IssueModal.editComment();
    });

    it.only('Should delete a comment successfully', () => {
        IssueModal.deleteComment();
    });
});
