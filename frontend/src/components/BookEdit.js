import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'

const UpdateBook = () => {
  const params = useParams()
  const history = useHistory()

  const [successMessage, setSuccessMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  useEffect(() => {
    if (params.id) {
      axios.get(`http://localhost:5000/api/books/${params.id}`).then((res) => {
        const book = res.data

        setTitle(book.title)
        setDescription(book.description)
        setAuthor(book.author)
      })
    }
  }, [params])

  const updateHandler = (e) => {
    history.push('/')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (params.id) {
        await axios.put(`http://localhost:5000/api/books/${params.id}`, {
          title,
          author,
          description,
        })
        setSuccessMessage(`Book "${title}" updated successfully!`)
      } else {
        await axios.post(`http://localhost:5000/api/books`, {
          title,
          author,
          description,
        })
        setSuccessMessage(`Book "${title}" created successfully!`)
      }
    } catch (error) {
      setErrorMessage(error)
    }
  }

  return (
    <Container>
      <Button onClick={updateHandler} className='my-3' data-cy='previous-page'>
        Go Back
      </Button>
      <Form data-cy='updatebook'>
        <Container md={4}>
          <Form.Group data-cy='title'>
            <Form.Label>Book Name: </Form.Label>
            <Form.Control
              data-cy='title-input'
              type='text'
              value={title}
              placeholder='Book Name'
              onChange={handleTitleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group data-cy='author'>
            <Form.Label>Book Author: </Form.Label>
            <Form.Control
              type='text'
              value={author}
              placeholder='Author Name'
              onChange={handleAuthorChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group data-cy='description'>
            <Form.Label>Description: </Form.Label>
            <Form.Control
              value={description}
              type='text'
              placeholder='Description'
              onChange={handleDescriptionChange}
            ></Form.Control>
          </Form.Group>
          {params.id ? (
            <Button type='submit' data-cy='update' onClick={onSubmit}>
              Update
            </Button>
          ) : (
            <Button
              type='submit'
              data-cy='create'
              onClick={onSubmit}
              disabled={!title || !author || !description}
            >
              Create
            </Button>
          )}

          <div className='mt-3'>
            {successMessage && (
              <Alert variant='success'>{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
          </div>
        </Container>
      </Form>
    </Container>
  )
}

export default UpdateBook
