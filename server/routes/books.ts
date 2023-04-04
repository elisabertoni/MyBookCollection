import express from 'express'
import { addBook, deleteBook, getAllBooks, updateBook } from '../db/books'
const router = express.Router()

//GET /api/v1/books
router.get('/', async (req, res) => {
  try {
    const books = await getAllBooks()
    res.json(books)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "There was an error trying to get the books"
    })
  }
})

// POST /api/v1/books
router.post('/', async (req, res) => {
  try {
    const newBook = req.body

    const [newBookId] = await addBook(newBook)

    res.json({ id: newBookId, ...newBook })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "There was an error trying to add the book"
    })
  }
})

// PATCH  /api/v1/books/:id
router.patch('/:id', async (req, res) => {
  try {
    const bookId = req.params.id

    if (isNaN(Number(bookId))) {
      res.status(400).json({
        error: 'Invalid Book ID',
      })
    }

    const updatedBook= await updateBook(Number(bookId), req.body)
    res.json(updatedBook)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "There was an error trying to update the book"
    })
  }
})

// DELETE  /api/v1/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const bookId = req.params.id

    if (isNaN(Number(bookId))) {
      res.status(400).json({
        error: 'Invalid Book ID',
      })
    }

    await deleteBook(Number(bookId))
    res.status(200).json('OK')

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "There was an error trying to delete the book"
    })
  }
})

export default router