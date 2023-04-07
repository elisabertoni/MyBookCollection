import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

import { Book, BookCreate } from '../../models/book'
import { fetchBooks, addBook, updateBook, deleteBook } from '../actions/books'

export default function Books() {
  const [newBook, setNewBook] = useState( {title: '', author: ''} as BookCreate) 

  const { loading, error, data } = useAppSelector( state => state. booksState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewBook({ title: event.target.value, author: event.target.value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addBook(newBook))
    setNewBook({title: '', author: ''})
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <img src='/loading-spinner.gif' alt='loading-spinner' />}
      
      
      <ul>
        {data.map(book => (
          <li key={book.id}>{book.title} by {book.author}
          </li>
        ))}
      </ul>

    </div>
  )
} 