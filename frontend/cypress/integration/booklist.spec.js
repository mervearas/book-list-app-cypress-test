/// <reference types="cypress" />

context('check the functionality of the booklist app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/') 
    })

    describe('check the functionality of book list form and buttons', () => {
        after(() => {
            cy.get('[data-cy=previous-page]')
            .click()
            cy.get(':nth-child(2) > :nth-child(4) > .btn-group > [data-cy=delete-book]')
            .click()
          })

        it('should create a new book and delete it', () => {
            cy.contains('Add new book')
            .click()
            cy.url('http://localhost:3000/create')
            cy.get('[data-cy=title-input]')
            .type('merve')
            cy.get('[data-cy=author] > .form-control')
            .type('hey')
            cy.get('[data-cy=description] > .form-control')
            .type('bnm')
            cy.get('[data-cy=create]')
            .click()
            cy.get('.fade')
            .should('not.be.null')
        })

        it('should update the book after editing', () => {
            cy.get(':nth-child(1) > :nth-child(4) > .btn-group > [data-cy=edit-book]')
            .click()
            cy.get('[data-cy=title-input]')
            .clear()
            .type('edited')
            cy.get('[data-cy=author] > .form-control')
            .clear()
            .type('edited')
            cy.get('[data-cy=description] > .form-control')
            .clear()
            .type('edited')
            cy.get('[data-cy=update]')
            .click()
        })

        it('should disabled the create button if the inputs are empty', () => {
            cy.contains('Add new book')
            .click()
            cy.url('http://localhost:3000/create')
            cy.get('[data-cy=title-input]')
            .should('be.empty')
            cy.get('[data-cy=author] > .form-control')
            .should('be.empty')
            cy.get('[data-cy=description] > .form-control')
            .should('be.empty')
            cy.get('[data-cy=create]')
            .should('be.disabled')
        })
    })
})