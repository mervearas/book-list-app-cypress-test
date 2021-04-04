import express from 'express'
import {
  addBook,
  getBook,
  updateBook,
  deleteBook,
  getBooks,
} from '../controllers/bookController.js'

const router = express.Router()

router.route('/').post(addBook).get(getBooks)
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook)

export default router
