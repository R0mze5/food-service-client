
describe("Create Account Page", () => {

  it("can see email & password validation errors  ", () => {

    cy.visit("/create-account")
    cy.findByPlaceholderText(/Email/i).type("test")
    cy.get(".error").should("have.text", "Wrong email")
    
    cy.findByPlaceholderText(/Email/i).clear()
    cy.get(".error").should("have.text", "Email is required")

    cy.findByPlaceholderText(/Email/i).type("user@user.com")

    cy.findByPlaceholderText(/password/i).type("t").clear()
    cy.get(".error").should("have.text", "Password is required")

  })

  it("should fill the form and redirect", () => {
    cy.intercept("http://localhost:4000/graphql", (req, res) => {
      if(req.body.operationName === "CreateAccountMutation") {
       return req.reply(res => {
          // res.send({"data":{"createAccount":{"ok":true,"error":null,"__typename":"CreateAccountOutput"}}})
          res.send({fixture: "auth/create-account" })
        })
      }
    })

    cy.visit("/create-account")

    cy.findByPlaceholderText(/Email/i).type("user@user.com")
    cy.findByPlaceholderText(/password/i).type("user")
    cy.findByRole("button").click()

    cy.url().should("eq", "http://localhost:3000/")

    cy.login("user@user.com", "user")

  })
})