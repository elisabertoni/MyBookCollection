import express from 'express'
import { getAllBooks } from '../db/books'
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

export default router