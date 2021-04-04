import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap'

const BookList = () => {
  const [books, setBooks] = useState()
  const history = useHistory()

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then((res) => {
      setBooks(res.data)
    })
  }, [])

  const submitHandler = (e) => {
    history.push('/create')
  }

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`)
    setBooks(books.filter((book) => book._id !== id))
  }

  return (
    <Container>
      <Button onClick={submitHandler} className='m-5' data-cy='create-book'>
        Add new book
      </Button>

      <Table data-cy='books-details'>
        {books &&
          books.map((book) => (
            <Row key={book._id} className='m-4'>
              <Col>{book.title}</Col>
              <Col>{book.author}</Col>
              <Col>{book.description}</Col>
              <Col>
                <ButtonGroup>
                  <Button
                    size='sm'
                    onClick={() => history.push(`/update/${book._id}`)}
                    data-cy='edit-book'
                  >
                    Edit
                  </Button>
                  <Button
                    size='sm'
                    variant='danger'
                    onClick={() => deleteHandler(book._id)}
                    data-cy='delete-book'
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          ))}
      </Table>
    </Container>
  )
}

export default BookList
