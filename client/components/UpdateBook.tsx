import { useState, FormEvent } from 'react'
import { useAppDispatch } from '../hooks/redux'

import { Book, BookUpdate } from '../../models/book'
import { updateBook } from '../actions/books'

interface BookProps {
  book: Book
}

export default function UpdateBook({book}: BookProps) {
  
  const [updatedBook, setUpdatedBook] = useState<BookUpdate>({title: book.title, author: book.author})
  const [showForm, setShowForm] = useState(false)
  
  const dispatch = useAppDispatch()
  
  function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (book.id){
      dispatch(updateBook(book.id, updatedBook))
    }
    setShowForm(false)
  }

  if (!showForm)
    return (
      <button onClick={() => setShowForm(true)}>Update</button>
    )

  return (
    <div>
      <form onSubmit={handleUpdate} aria-label='Update Book'>

        <label htmlFor='updateBookTitle'>Book Title</label>
        <input
          type='text'
          name='title'
          id={`${book.id}`}
          placeholder='Title'
          value={updatedBook.title}
          onChange={(e) => setUpdatedBook({...updatedBook, title: e.target.value})}
        />

        <label htmlFor='updateBookAuthor'>Book Author</label>
        <input
          type='text'
          name='author'
          id={`${book.id}`}
          placeholder='Author'
          value={updatedBook.author}
          onChange={(e) => setUpdatedBook({...updatedBook, author: e.target.value})}
        /> 

        <button type='submit'>Update Book</button>
      </form>
    </div>
  )
} 