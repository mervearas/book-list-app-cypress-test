/// <reference types="cypress" />

describe('API', () => {
    it('Get', () => {
        cy.request('GET', 'http://localhost:5000/api/books')
        .then((response) => {
            expect(response).to.have.property('status', 200)
        })
    })

    it('POST', () => {
        var item = {
            "title": "stringefghjhkghjkfghjk",
            "author": "string",
            "description": "string"
        }

        cy.request('POST', 'http://localhost:5000/api/books', item)
        .then((response) => {
            expect(response.status).equal(201)
            expect(response.body.title).equal(item.title)
            expect(response.body.author).equal(item.author)
            expect(response.body.description).equal(item.description)
        })
    })

    it('PUT', () => {
        cy.request('GET', 'http://localhost:5000/api/books')
        .then((response) => {
            expect(response.status).equal(200)

            console.log(response)
            var updated = {
                "title": "stringergjkj",
                "author": "string",
                "description": "string"
            }
    
            cy.request('PUT', `http://localhost:5000/api/books/${response.body[0]._id}`, updated)
            .then((response) => {
                expect(response.status).equal(200)
                console.log(response)
                expect(response.body.title).equal(updated.title)
                expect(response.body.author).equal(updated.author)
                expect(response.body.description).equal(updated.description)
            })
        })
    })

    it('DELETE', () => {
        cy.request('GET', 'http://localhost:5000/api/books')
        .then((response) => {
            expect(response.status).equal(200)
    
            cy.request('DELETE', `http://localhost:5000/api/books/${response.body[0]._id}`)
            .then((response) => {
                expect(response.status).equal(200)
            })
        })
    })
})