import { ThunkAction } from "../store";
import { getBooksApi, addBookApi, updateBookApi, deleteBookApi } from "../apis/books";
import { Book, BookCreate } from "../../models/book";

export const SET_BOOK_PENDING = 'SET_BOOKS_PENDING'
export const SET_BOOK_SUCCESS = 'SET_BOOKS_SUCCESS'
export const SET_BOOK_ADD = 'SET_BOOK_ADD'
export const SET_BOOK_UPDATE = 'SET_BOOK_UPDATE'
export const SET_BOOK_DELETE = 'SET_BOOK_DELETE'
export const SET_ERROR = 'SET_PENDING'

export type BookAction = 
  | { type: typeof SET_BOOK_PENDING; payload: null }
  | { type: typeof SET_BOOK_SUCCESS ; payload: Book[] }
  | { type: typeof SET_BOOK_ADD ; payload: Book[] }
  | { type: typeof SET_BOOK_UPDATE ; payload: Book }
  | { type: typeof SET_BOOK_DELETE ; payload: null }
  | { type: typeof SET_ERROR; payload: string }


export function setBooksPending(): BookAction {
  return {
    type: SET_BOOK_PENDING,
    payload: null 
  }
}

export function setBooksSuccess(books: Book[]): BookAction {
  return {
    type: SET_BOOK_SUCCESS,
    payload: books
  }
}

export function setBookAdd(books: Book[]): BookAction {
  return {
    type: SET_BOOK_ADD,
    payload: books
  }
}

export function setBookUpdate(books: Book): BookAction {
  return {
    type: SET_BOOK_UPDATE,
    payload: books
  }
}

export function setBookDelete(): BookAction {
  return {
    type: SET_BOOK_DELETE,
    payload: null
  }
}
export function setError(errMessage: string): BookAction {
  return {
    type: SET_ERROR,
    payload: errMessage
  }
}

export function fetchBooks(): ThunkAction {
  return dispatch => {
    dispatch(setBooksPending())
    return getBooksApi()
    .then(books => {
      dispatch(setBooksSuccess(books))
    })
    .catch(err => {
      dispatch(setError(err.message))
    })
  }
}

export function addBook(newBook: BookCreate): ThunkAction {
  return dispatch => {
    return addBookApi(newBook)
    .then(books => {
      dispatch(setBookAdd(books))
    })
    .catch(err => {
      dispatch(setError(err.message))
    })
  }
}

export function updateBook(bookId:number, book: Book): ThunkAction {
  return dispatch => {
    return updateBookApi(bookId, book)
    .then(book => {
      dispatch(setBookUpdate(book))
      dispatch(fetchBooks())
    })
    .catch(err => {
      dispatch(setError(err.message))
    })
  }
}

export function deleteBook(bookId: number): ThunkAction {
  return dispatch => {
    return deleteBookApi(bookId)
    .then(() => {
      dispatch(setBookDelete())
      dispatch(fetchBooks())
    })
    .catch(err => {
      dispatch(setError(err.message))
    })
  }
}