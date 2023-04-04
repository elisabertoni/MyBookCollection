import connection from './connection'
import { Book } from '../../models/book'

// Books functions
export function getAllBooks( db = connection): Promise<Book[]> {
  return db('books').select()
}

export function addBook(newBook: Book, db = connection): Promise<Book[]> {
  return db('books').insert({...newBook})
}

export function updateBook(bookId:number, updatedBook: Book, db = connection): Promise<Book> {
  return db('books')
    .update(updatedBook)
    .where('id', bookId )
    .returning(['id', 'title', 'author'])
    .then((result) => result[0])
}