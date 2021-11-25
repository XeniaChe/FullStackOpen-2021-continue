describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Xenia Che',
      username: 'Xenia FE',
      password: 'secret password',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2020'
    );
  });

  /*
  it('front page contains random text', function () {
    cy.visit('http://localhost:3000');
    cy.contains('wtf is this app?');
  });
  */

  //testing login
  it('login form can be opened', function () {
    cy.contains('login').click();
    cy.get('#username').type('Xenia FE');
    cy.get('#password').type('secret password');
    cy.get('#login-button').click();

    cy.contains('Xenia Che is loged-in');
  });

  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('Xenia FE');
    cy.get('#password').type('wrong secret');
    cy.get('#login-button').click();

    cy.get('.error')
      .contains('invalid username or password')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  describe('when logged in', function () {
    // Aftre login moved to support/commands
    beforeEach(function () {
      cy.login({ userName: 'Xenia FE', password: 'secret password' });
    });

    //BYPASS THE UI - good pracitce for sending note instead a filling a form
    it('a new note can be created', function () {
      cy.newNoteCreate({
        content: 'note created by cypress',
        important: false,
      });
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click();
        cy.get('input').type('another note by cypress');
        cy.contains('save').click();
        cy.contains('another note by cypress');
      });

      it('it can be made important', function () {
        cy.contains('another note by cypress')
          .contains('make importrant')
          .click();

        cy.contains('another note by cypress').contains('make not important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.newNoteCreate({ content: 'first note', important: false });
        cy.newNoteCreate({ content: 'second note', important: false });
        cy.newNoteCreate({ content: 'third note', important: false });
      });

      it.only('one of those can be made important', function () {
        /*
        ..CHAINING
        cy.contains('first note').contains('make importrant').click();

        cy.contains('first note').contains('make not important');
        */
        // cy.contains('first note').parent().find('button').as('theButton');
        cy.contains('first note')
          // .parent()
          .get('button')
          .as('theButton');

        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});
