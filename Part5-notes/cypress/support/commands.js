// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/* //old version of  testing login
    // bad practise of logging in
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('input:first').type('Xenia FE');
      cy.get('input:last').type('secret password');
      cy.get('#login-button').click();
    });
    */

Cypress.Commands.add('login', ({ userName, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    userName,
    password,
  }).then((response) => {
    //name of the item in localStor should be the same as in the main code!!
    localStorage.setItem('loggedUserToJson', JSON.stringify(response.body));
    cy.visit('http://localhost:3000');
  });
});

//old version of adding note test
/*
    it.only('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('note created by cypress');
      cy.contains('save').click();
      cy.contains('note created by cypress');
    });
    */

Cypress.Commands.add('newNoteCreate', ({ content, important }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/notes',
    body: {
      content,
      important,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUserToJson')).token
      } `,
    },
  });

  cy.visit('http://localhost:3000');
});
