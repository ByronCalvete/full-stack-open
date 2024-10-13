describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Root',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.contains('Root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('My first blog from Cypress')
      cy.get('#author').type('Rocky Calvete')
      cy.get('#url').type('www.rocky.com')
      cy.get('#create-button').click()

      cy.get('.success')
        .should('contain', 'a new blog My first blog from Cypress by Rocky Calvete')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      
      cy.contains('My first blog from Cypress Rocky Calvete')
    })

    describe('a several blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Blog 2', author: 'Author 2', url: 'www.2.com' })
        cy.createBlog({ title: 'Blog 3', author: 'Author 3', url: 'www.3.com' })
        cy.createBlog({ title: 'Blog 4', author: 'Author 4', url: 'www.4.com' })
      })

      it('a use can like a blog', function() {
        cy.contains('Blog 2')
          .contains('view')
          .click()
        cy.contains('like').click()

        cy.contains('likes 1')
      })
    })
  })
})
