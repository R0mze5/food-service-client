

describe('EditProfilePage', () => {

  beforeEach(() => {
    cy.login("user@user.com", "user")
  })

  
  it('can go to /edit-profile using the header', () => {
    cy.findByLabelText(/edit profile/i).click()

    cy.url().should("eq", "http://localhost:3000/edit-profile").title().should('eq', 'Edit Profile | Food Service')

  })

  it('can change email', () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req, res) => {
      console.log(req.body)
      if(req.body.operationName === "EditProfile") {
        req.body.variables.input.email = "user@user.com";
        
       return req.reply(res => {
          res.send({"data":{"editProfile":{"ok":true,"error":null,"__typename":"EditProfileOutput"}}})
        })
      }
    })

    cy.visit("/edit-profile") 

    cy.findByPlaceholderText(/email/i).clear().type("new@user.com")
    cy.findByRole("button").click()


  })
});