import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

import bookRoutes from './routes/bookRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

// https://stackoverflow.com/a/60632978
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Content-Type, Authorization, X-Requested-With'
  )
  next()
})

app.use('/api/books', bookRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
