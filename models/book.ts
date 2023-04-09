export interface Book {
  id: number
  title: string
  author: string
}

export interface BookCreate {
  title: string
  author: string
}

export interface BookUpdate {
  title?: string
  author?: string
}