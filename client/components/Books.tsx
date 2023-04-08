import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

import { Book, BookCreate, BookUpdate } from '../../models/book'
import { fetchBooks, addBook, updateBook, deleteBook } from '../actions/books'

interface Props {
  book: Book
}

export default function Books({book}: Props) {
  const [newBook, setNewBook] = useState( {title: '', author: ''} as BookCreate) 
  const [updatedBook, setUpdatedBook] = useState({title: '', author: ''} as BookCreate)
  const { loading, data, error } = useAppSelector( state => state. booksState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   setNewBook({ ...newBook, [event.target.name]: event.target.value })
  // }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addBook(newBook))
    setNewBook({ title: '', author: ''})
    console.log(setNewBook)
  }

  function handleDelete(bookId: number) {
    dispatch(deleteBook(bookId))
  }

  function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (book.id){
      dispatch(updateBook(book.id, updatedBook))
    }
    setUpdatedBook({ title: '', author: ''})
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <img src='/loading-spinner.gif' alt='loading-spinner' />}
      
      <ul>
        {data.map(book => (
          <li key={book.id}>{book.title} by {book.author}
          
          <button onClick={() => handleDelete(book.id)}>Delete</button>
          
          <p>
          <form onSubmit={handleUpdate} aria-label='Update Book'>

            <label htmlFor='updateBookTitle'>Book Title</label>
            <input
              type='text'
              name='book title'
              id={`${book.id}`}
              placeholder='Title'
              value={updatedBook.title}
              onChange={(e) => setUpdatedBook({...newBook, title: e.target.value})}
            />

            <label htmlFor='updateBookAuthor'>Book Author</label>
            <input
              type='text'
              name='book author'
              id={`${book.id}`}
              placeholder='Author'
              value={updatedBook.author}
              onChange={(e) => setUpdatedBook({...newBook, author: e.target.value})}
            /> 

            <button type='submit'>Update Book</button>
            </form>
          </p>
          
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} aria-label='Add Book'>

        <label htmlFor='bookTitle'>Book Title</label>
        <input
          type='text'
          name='book title'
          id='bookId'
          placeholder='Title'
          value={newBook.title}
          onChange={(e) => setNewBook({...newBook, title: e.target.value})}
        />

        <label htmlFor='bookAuthor'>Book Author</label>
        <input
          type='text'
          name='book author'
          id='bookId'
          placeholder='Author'
          value={newBook.author}
          onChange={(e) => setNewBook({...newBook, author: e.target.value})}
        /> 

      <button type='submit'>ADD NEW BOOK</button>
      </form>

    </div>
  )
} 