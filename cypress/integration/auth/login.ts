
describe("Login Page", () => {
  it("should open Login Page", () => {
    cy.visit("/").title().should("eq", "Login | Food Service");

  });

  it("can see email & password validation errors  ", () => {

    cy.visit("/")
    cy.findByPlaceholderText(/Email/i).type("test")
    cy.get(".error").should("have.text", "Wrong email")
    
    cy.findByPlaceholderText(/Email/i).clear()
    cy.get(".error").should("have.text", "Email is required")

    cy.findByPlaceholderText(/Email/i).type("test@test.com")

    cy.findByPlaceholderText(/password/i).type("t").clear()
    cy.get(".error").should("have.text", "Password is required")

  })

  it("should fill the form and login", () => {

    cy.visit("/")
    cy.findByPlaceholderText(/Email/i).type("user@user.com")
    cy.findByPlaceholderText(/password/i).type("user")
    cy.findByRole("button").click()

    cy.window().its("localStorage.food-service-token").should('be.a', 'string')
  })
})
