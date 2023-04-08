import request from "superagent"
import { Book, BookCreate } from "../../models/book"

export async function getBooksApi(): Promise<Book[]> {
  const response = await request.get('/api/v1/books')
  return response.body
}

export async function addBookApi(newBook: BookCreate): Promise<Book[]> {
  const response = await request.post('/api/v1/books').send(newBook)
  return response.body
}

export async function updateBookApi(bookId:number, updatedBook: Book): Promise<Book> {
  const response = await request.patch(`/api/v1/books/${bookId}`).send(updatedBook)
  return response.body
}

export async function deleteBookApi(bookId:number) {
  await request.delete(`/api/v1/books/${bookId}`)
}