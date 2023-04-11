import connection from './connection'
import { getAllBooks, addBook, updateBook, deleteBook } from '../db/books'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('database tests', () => {
  it('getAllBooks works', async () => {
    // Arrange
    expect.assertions(2)

    // Act
    const books = await getAllBooks()

    // Assert
    expect(books).toHaveLength(11)
    expect(books).toMatchSnapshot(`[
      { id: 1, title: 'The Catcher in the Rye', author: 'J.D.Salinger' },
      { id: 2, title: 'It Ends with Us', author: 'Colleen Hoover' },
      {
        id: 3,
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K.Rowling'
      },
      {
        id: 4,
        title: 'The Lion, the Witch, and the Wardrobe',
        author: 'C.S. Lewis'
      },
      { id: 5, title: 'Normal People', author: 'Sally Rooney' },
      { id: 6, title: 'The Duke and I', author: 'Julia Quinn' },
      { id: 7, title: 'Girls That Invest', author: 'Simran Kaur' },
      {
        id: 8,
        title: 'My Darling Lemon Thyme: Every Day',
        author: 'Emma Galloway'
      },
      { id: 9, title: 'Search Inside Yourself', author: ' Chade-Meng Ta' },
      {
        id: 10,
        title: 'Homegrown Kitchen: Everyday Recipes for Eating Well',
        author: 'Nicola Galloway'
      },
      {
        id: 11,
        title: 'Healthy Baking: Nourishing breads, wholesome cakes, ancient grains and bubbling ferments',
        author: 'Jordan Bourke'
      }
    ]`)
  })
  it('should add a new book', async () => {

    // Arrange
    expect.assertions(4)

    // Act
    const newBook = { id: 12, title: 'Harry Potter', author: 'J.K. Rowling'}
    await addBook(newBook)
    const books = await getAllBooks()

    // Assert
    expect(books).toHaveLength(12)
    expect(newBook.title).toBe('Harry Potter')
    expect(newBook.author).toBe('J.K. Rowling')
    expect(newBook.id).toBe(12)
    
  })
  it('should update a book', async () => {
     // Arrange
     expect.assertions(3)

     // Act
     const bookId = 3
     const updatedbook = {title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling'}
     await updateBook(bookId, updatedbook)
     const books = await getAllBooks()
 
     // Assert
    expect(books).toHaveLength(11)
    expect(updatedbook.title).toBe('Harry Potter and the Chamber of Secrets')
    expect(updatedbook.author).toBe('J.K. Rowling')
  })
  
})
