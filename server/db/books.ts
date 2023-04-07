import connection from './connection'
import { Book, BookCreate } from '../../models/book'

export function getAllBooks( db = connection): Promise<Book[]> {
  return db('books').select('id', 'title', 'author')
}

export async function addBook(newBook: BookCreate, db = connection): Promise<Book[]> {
  await db('books').insert({...newBook})
  return getAllBooks()
}

export async function updateBook(bookId:number, updatedBook: Book, db = connection): Promise<Book[]> {
  await db('books').update(updatedBook).where('id', bookId )
  return getAllBooks()
    // .returning(['id', 'title', 'author'])
    // .then((result) => result[0])
}

export async function deleteBook(bookId:number, db = connection) {
  await db('books').where('id', bookId).del()
  return getAllBooks()
}