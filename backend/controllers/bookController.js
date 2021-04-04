import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'

// @desc    Add new book
// @route   POST /api/books
// @access  Public
const addBook = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.author) {
    res.status(400)
    throw new Error('Bad request')
  }

  const { title, author, description } = req.body

  const bookExists = await Book.findOne({ title })

  if (bookExists) {
    res.status(400)
    throw new Error('Book already exists')
  }

  const book = await Book.create({
    title,
    author,
    description,
  })

  if (book) {
    res.status(201).json({
      id: book._id,
      title: book.title,
      author: book.author,
      description: book.description,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    })
  } else {
    res.status(400)
    throw new Error('Invalid book data')
  }
})

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    res.status(200).json({
      id: book._id,
      title: book.title,
      author: book.author,
      description: book.description,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Public
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (!req.body.title && !req.body.description && !req.body.author) {
    res.status(400)
    throw new Error('Bad request')
  }

  if (book) {
    book.title = req.body.title || book.title
    book.author = req.body.author || book.author
    book.description = req.body.description || book.description

    const updatedBook = await book.save()

    res.status(200).json({
      id: updatedBook._id,
      title: updatedBook.title,
      author: updatedBook.author,
      description: updatedBook.description,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Public
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    await book.remove()
    res.status(200).json({ message: 'book removed' })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Get all books
// @route   GET /api/books
// @access  Private/Admin
const getBooks = asyncHandler(async (req, res) => {
  const book = await Book.find({})
  res.status(200).json(book)
})

export { addBook, getBook, updateBook, deleteBook, getBooks }
