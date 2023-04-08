export interface Book {
  id: number
  title: string
  author: string
}

export interface BookCreate {
  id?: number
  title: string
  author: string
}

export interface BookUpdate {
  id?: number
  title?: string
  author?: string
}