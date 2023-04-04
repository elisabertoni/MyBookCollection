import express from 'express'
import { addBook, getAllBooks } from '../db/books'
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
export default router