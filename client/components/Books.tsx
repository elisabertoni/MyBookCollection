import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

import { BookCreate } from '../../models/book'
import { fetchBooks, addBook, deleteBook } from '../actions/books'
import UpdateBook from './UpdateBook'

export default function Books() {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
  } as BookCreate)
  const { loading, data, error } = useAppSelector((state) => state.booksState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewBook({ ...newBook, [event.target.name]: event.target.value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addBook(newBook))
    setNewBook({ title: '', author: '' })
  }

  function handleDelete(bookId: number) {
    dispatch(deleteBook(bookId))
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <img src="/loading-spinner.gif" alt="loading-spinner" />}

      <form onSubmit={handleSubmit} aria-label="Add Book">
        <label htmlFor="bookTitle">Book Title:</label>
        <input
          type="text"
          name="title"
          id="bookTitle"
          placeholder="Title"
          value={newBook.title}
          onChange={handleChange}
        />

        <label htmlFor="bookAuthor">Book Author:</label>
        <input
          type="text"
          name="author"
          id="bookAuthor"
          placeholder="Author"
          value={newBook.author}
          onChange={handleChange}
        />

        <button type="submit">ADD NEW BOOK</button>
      </form>

      <ul>
        {data.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
            {<UpdateBook book={book} />}
          </li>
        ))}
      </ul>
    </div>
  )
}
