describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")

    cy.visit("/")
      .contains("[data-testid=day]", "Monday")
  })

  it("should book an interview", () => {


    cy.get("[alt=Add]")
      .first()
      .click()

    cy.get("[data-testid=student-name-input]")
      // .find('input').first()
      .type("Lydia Miller-Jones")
      .should("have.value", "Lydia Miller-Jones")

    cy.get("[alt='Sylvia Palmer']")
      .click()

    cy.contains("Save")
      .click()

    cy.contains("Saving")

    cy.contains(".appointment__card--show", "Lydia Miller-Jones")

    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  //--------------

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true })

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Mill-Jones")

    cy.get("[alt='Tori Malcolm']")
      .click()

    cy.contains("Save")
      .click()
    cy.contains("Saving")
    cy.contains(".appointment__card--show", "Lydia Mill-Jones")

    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  //--------------

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true })

    cy.contains("Confirm")
      .click()
    cy.contains("Deleting")
    cy.contains("Deleting")
      .should("not.exist")

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist")
  });
})