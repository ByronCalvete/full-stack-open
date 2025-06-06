describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Root',
      username: 'root',
      password: 'sekret'
    }
    const user2 = {
      name: 'Admin',
      username: 'admin',
      password: 'admin'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

    cy.visit('')
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

      describe('delete blogs', function() {
        it('login with admin and the user who created a blog can delete it', function() {
          cy.contains('logout').click()
          cy.login({ username: 'admin', password: 'admin' })
          cy.createBlog({ title: 'Blog 5', author: 'Author 5', url: 'www.5.com'  })
  
          cy.contains('Blog 5')
            .contains('view')
            .click()
          cy.contains('remove').click()
  
          cy.get('html').should('not.contain', 'Blog 5')
        })

        it('only creator can see the delete button', function() {
          cy.contains('Blog 4')
            .contains('view')
            .click()

          cy.contains('remove')
        })

        it('a different creator not see the delete button', function () {
          cy.contains('logout').click()
          cy.login({ username: 'admin', password: 'admin' })

          cy.contains('Blog 4')
            .contains('view')
            .click()

          cy.should('not.contain', 'remove')
        })
      })

      describe('ordered blogs', function() {
        it('by likes from highest to lowest', function() {
          cy.contains('Blog 2')
            .contains('view')
            .click()
          cy.contains('like').click()
          cy.contains('hide').click()

          cy.contains('Blog 3')
            .contains('view')
            .click()
          cy.contains('like').click()
          cy.contains('hide').click()

          cy.contains('Blog 3')
            .contains('view')
            .click()
          cy.contains('like').click()
          cy.contains('hide').click()

          cy.get('.blog').eq(0).should('contain', 'Blog 3')
          cy.get('.blog').eq(1).should('contain', 'Blog 2')
          cy.get('.blog').eq(2).should('contain', 'Blog 4')
        })
      })
    })
  })
})
