const comment = 'TEST_COMMENT'; 
const previousComment = 'An old silent pond...';


class IssueModal {
        constructor() {
        this.submitButton = 'button[type="submit"]';
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueDetailModal = '[data-testid="modal:issue-details"]';
        this.title = 'input[name="title"]';
        this.issueType = '[data-testid="select:type"]';
        this.descriptionField = '.ql-editor';
        this.assignee = '[data-testid="select:userIds"]';
        this.backlogList = '[data-testid="board-list:backlog"]';
        this.issuesList = '[data-testid="list-issue"]';
        this.deleteButton = '[data-testid="icon:trash"]';
        this.deleteButtonName = "Delete issue";
        this.cancelDeletionButtonName = "Cancel";
        this.confirmationPopup = '[data-testid="modal:confirm"]';
        this.closeDetailModalButton = '[data-testid="icon:close"]';
        this.addComment = 'textarea[placeholder="Add a comment..."]';
        this.commentField = 'Add a comment...';
        this.saveButtonName = 'Save';
        this.issueComment = '[data-testid="issue-comment"]';
        this.editButton = 'Edit';
        this.deleteButtonComment = 'Delete';
        this.confirmDeleteComment = 'Delete comment';
    }

    getIssueModal() {
        return cy.get(this.issueModal);
    }

    getIssueDetailModal() {
        return cy.get(this.issueDetailModal);
    }

    selectIssueType(issueType) {
        cy.get(this.issueType).click('bottomRight');
        cy.get(`[data-testid="select-option:${issueType}"]`)
            .trigger('mouseover')
            .trigger('click');
    }

    selectAssignee(assigneeName) {
        cy.get(this.assignee).click('bottomRight');
        cy.get(`[data-testid="select-option:${assigneeName}"]`).click();
    }

    editTitle(title) {
        cy.get(this.title).debounced('type', title);
    }

    editDescription(description) {
        cy.get(this.descriptionField).type(description);
    }

    createIssue(issueDetails) {
        this.getIssueModal().within(() => {
            this.selectIssueType(issueDetails.type);
            this.editDescription(issueDetails.description);
            this.editTitle(issueDetails.title);
            this.selectAssignee(issueDetails.assignee);
            cy.get(this.submitButton).click();
        });
    }

    addNewComment() {
        this.getIssueDetailModal().within(() => {
        cy.contains(this.commentField).click();
        cy.get(this.addComment).type(comment);
        cy.contains('button', this.saveButtonName).click().should('not.exist');
        });
    }
    verifyComment() {
        this.getIssueDetailModal().within(() => {
        cy.contains(this.commentField).should('exist');
        cy.get(this.issueComment).should('contain', comment);
    });
    }
   
    editComment() {
        this.getIssueDetailModal().within(() => {
        cy.get(this.issueComment).first().contains(this.editButton).click().should('not.exist');
        cy.get(this.addComment).should('contain', previousComment).clear().type(comment);
        cy.contains('button', this.saveButtonName).click().should('not.exist');
        cy.get(this.issueComment).should('contain', this.editButton).and('contain', comment);
     });
  }

    deleteComment() {
        this.getIssueDetailModal()   
        .find(this.issueComment).contains(this.deleteButtonComment).click();
        cy.get(this.confirmationPopup).contains('button', this.confirmDeleteComment).click().should('not.exist');
        this.getIssueDetailModal()
        .find(this.issueComment)
        .should('not.exist');
  }

    ensureIssueIsCreated(expectedAmountIssues, issueDetails) {
        cy.get(this.issueModal).should('not.exist');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');

        cy.get(this.backlogList).should('be.visible').and('have.length', '1').within(() => {
            cy.get(this.issuesList)
                .should('have.length', expectedAmountIssues)
                .first()
                .find('p')
                .contains(issueDetails.title);
            cy.get(`[data-testid="avatar:${issueDetails.assignee}"]`).should('be.visible');
        });
    }

    ensureIssueIsVisibleOnBoard(issueTitle) {
        cy.get(this.issueDetailModal).should('not.exist');
        cy.reload();
        cy.contains(issueTitle).should('be.visible');
    }

    ensureIssueIsNotVisibleOnBoard(issueTitle) {
        cy.get(this.issueDetailModal).should('not.exist');
        cy.reload();
        cy.contains(issueTitle).should('not.exist');
    }

    validateIssueVisibilityState(issueTitle, isVisible = true) {
        cy.get(this.issueDetailModal).should('not.exist');
        cy.reload();
        cy.get(this.backlogList).should('be.visible');
        if (isVisible)
            cy.contains(issueTitle).should('be.visible');
        if (!isVisible)
            cy.contains(issueTitle).should('not.exist');
    }

    clickDeleteButton() {
        cy.get(this.deleteButton).click();
        cy.get(this.confirmationPopup).should('be.visible');
    }

    confirmDeletion() {
        cy.get(this.confirmationPopup).within(() => {
            cy.contains(this.deleteButtonName).click();
        });
        cy.get(this.confirmationPopup).should('not.exist');
        cy.get(this.backlogList).should('be.visible');
    }

    cancelDeletion() {
        cy.get(this.confirmationPopup).within(() => {
            cy.contains(this.cancelDeletionButtonName).click();
        });
        cy.get(this.confirmationPopup).should('not.exist');
        cy.get(this.issueDetailModal).should('be.visible');
    }

    closeDetailModal() {
        cy.get(this.issueDetailModal).get(this.closeDetailModalButton).first().click();
        cy.get(this.issueDetailModal).should('not.exist');
    }
}

export default new IssueModal();