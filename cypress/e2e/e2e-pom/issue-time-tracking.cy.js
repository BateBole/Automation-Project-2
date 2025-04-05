import IssueModal from "../../pages/IssueModal";

describe('Add Estimation to Issue', () => {
    beforeEach(() => {
      // Visit the issue detail page
      cy.visit('/issue-detail'); // Update with actual issue URL
    });

    const issueTitle = 'This is an issue of type: Task.';
  
    it('User can add estimation to an issue', () => {
      cy.contains(issueTitle).click();
      cy.get(IssueModal.numberOfHours).should('exist').click();
      cy.get(IssueModal.numberOfHours).clear('8');
      cy.get(IssueModal.iconStopWatch).click();
      
      cy.get(IssueModal.timeTrackingModal).within(() => {
      cy.get(IssueModal.numberOfHours).first().click().clear()
      cy.contains('button', 'Done').click().should('not.exist'); 
    })
      cy.get(IssueModal.numberOfHours).click();
      cy.get(IssueModal.numberOfHours).type('10');
      cy.get(IssueModal.descriptionField).click();
      cy.get(IssueModal.saveDescription).click();
     
      cy.get(IssueModal.closeDetailModalButton).first().click();  
      cy.get(IssueModal.backlogList).should('be.visible');
      cy.contains(issueTitle).click();
      cy.get(IssueModal.timeEstimation).should('contain', '10h estimated')
  
  });

  it('User updates estimation, that was previously added to issue', () => {
    cy.contains(issueTitle).click();

    cy.get(IssueModal.numberOfHours).click();
    cy.get(IssueModal.numberOfHours).clear('8');
    cy.get(IssueModal.iconStopWatch).click();
    
    cy.get(IssueModal.timeTrackingModal).within(() => {
    cy.get(IssueModal.numberOfHours).first().click().clear()
    cy.contains('button', 'Done').click().should('not.exist');
  })
    cy.get(IssueModal.numberOfHours).click();
    cy.get(IssueModal.numberOfHours).type('20');
    cy.get(IssueModal.descriptionField).click();
    cy.get(IssueModal.saveDescription).click();

    cy.get(IssueModal.closeDetailModalButton).first().click();  
    cy.get(IssueModal.backlogList).should('be.visible');
    cy.contains(issueTitle).click();
    cy.get(IssueModal.timeEstimation).should('contain', '20h estimated')
  
  });

    it('User removes estimation, that was previously added to issue', () => {
      cy.contains(issueTitle).click();
  
      cy.get(IssueModal.numberOfHours).click();
      cy.get(IssueModal.numberOfHours).clear('8');
      
      cy.get(IssueModal.iconStopWatch).click();
      
      cy.get(IssueModal.timeTrackingModal).within(() => {
      cy.get(IssueModal.numberOfHours).first().click().clear();
      cy.contains('button', 'Done').click().should('not.exist');
      });
      cy.get(IssueModal.numberOfHours).click();
      cy.get(IssueModal.numberOfHours).clear();
      cy.get(IssueModal.descriptionField).click();
      cy.get(IssueModal.saveDescription).click();
  
      cy.get(IssueModal.closeDetailModalButton).first().click();  
      cy.get(IssueModal.backlogList).should('be.visible');
      cy.contains(issueTitle).click();
      cy.get(IssueModal.placeholderNumber).should('exist');
    })
 
      it('User logs spent time to recently created issue', () => {
        cy.contains(issueTitle).click();
        cy.get(IssueModal.iconStopWatch).click();
        cy.get(IssueModal.timeTrackingModal).should('be.visible');
        cy.get(IssueModal.placeholderNumber).eq(1).clear({ force: true }).type('2', { force: true });
        cy.get(IssueModal.placeholderNumber).eq(2).clear({ force: true }).type('5', { force: true });
        
        cy.contains('button', 'Done').click();
        cy.get(IssueModal.timeEstimation).should('contain', '2h logged')
        cy.contains('No Time Logged').should('not.exist');
    }) 
    
    it('User removes logged spent time from recently created issue', () => {
      cy.contains(issueTitle).click();
      cy.get(IssueModal.iconStopWatch).click();
      cy.get(IssueModal.timeTrackingModal).should('be.visible');
      cy.get(IssueModal.placeholderNumber).eq(1).clear()
      cy.get(IssueModal.placeholderNumber).eq(2).clear()
      cy.contains('button', 'Done').click();

      cy.get(IssueModal.closeDetailModalButton).first().click();  
      cy.get(IssueModal.backlogList).should('be.visible');
      cy.contains(issueTitle).click();
      cy.get(IssueModal.timeEstimation).should('contain', 'No time logged')
      
  })
});