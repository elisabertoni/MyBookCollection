import { SET_BOOK_PENDING, SET_BOOK_SUCCESS, SET_BOOK_ADD, SET_BOOK_UPDATE, SET_BOOK_DELETE, SET_ERROR, BookAction } from "../actions/books";
import { Book } from "../../models/book";

interface BookState {
  loading: boolean
  error: string | undefined
  data: Book[]
}

const initialState: BookState = {
  loading: false,
  error: undefined,
  data: []
}

export default function reducer(state = initialState, action: BookAction): BookState {
  switch (action.type) {
    case SET_BOOK_PENDING:
      return {
        loading: true,
        error: undefined,
        data: []
      }
    case SET_BOOK_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload
      }
    case SET_BOOK_ADD:
      return {
        loading: false,
        error: undefined,
        data: action.payload
      }
    case SET_BOOK_UPDATE:
    return {
      loading: false,
      error: undefined,
      data: action.payload
    }
    case SET_BOOK_DELETE:
      return {
        loading: false,
        error: undefined,
        data: []
      }
    case SET_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: []
      }
    default:
      return state
  }
}