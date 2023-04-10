import { SET_BOOK_PENDING, SET_BOOK_SUCCESS, SET_ERROR, BookAction } from "../actions/books";
import { Book } from "../../models/book";

interface BookState {
  loading: boolean
  data: Book[]
  error: string | undefined
}

const initialState: BookState = {
  loading: false,
  data: [],
  error: undefined
}

export default function reducer(state = initialState, action: BookAction): BookState {
  switch (action.type) {
    case SET_BOOK_PENDING:
      return {
        loading: true,
        data: [],
        error: undefined
      }
    case SET_BOOK_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: undefined
      }
    case SET_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default:
      return state
  }
}