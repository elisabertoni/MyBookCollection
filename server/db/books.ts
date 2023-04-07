import connection from './connection'
import { Book, BookCreate } from '../../models/book'

// Books functions
export function getAllBooks( db = connection): Promise<Book[]> {
  return db('books').select()
}

export async function addBook(newBook: BookCreate, db = connection): Promise<Book[]> {
  await db('books').insert({...newBook})
  return getAllBooks()
}

export function updateBook(bookId:number, updatedBook: Book, db = connection): Promise<Book> {
  return db('books')
    .update(updatedBook)
    .where('id', bookId )
    .returning(['id', 'title', 'author'])
    .then((result) => result[0])
}

export function deleteBook(bookId:number, db = connection) {
  return db('books').where('id', bookId).del()
}