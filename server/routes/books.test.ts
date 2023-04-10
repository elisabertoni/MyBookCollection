import request from 'supertest'
import server from '../server'
import * as db from '../db/books'
jest.mock('../db/books')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const getBooksMockData = [
  {
    id: 1,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger'
  }
]

// describe('GET /api/v1/books', () => {
//   it('should return data from the books table', async () => {
//     // Arrange
//     expect.assertions(2)

//     jest.mocked(db.getAllBooks).mockResolvedValue(getBooksMockData)

//     // Act
//     const response = await request(server).get('/api/v1/books')

//     // Assert
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual(getBooksMockData)
//   })

//   it('should return status 500 and an error message when database fails', async () => {
//     // Arrange
//     expect.assertions(1)
  
//     jest.spyOn(console, 'log').mockImplementation(() => {})
//     jest.mocked(db.getAllBooks).mockRejectedValue(new Error('Mock error message'))
  
//     // Act
//     const response = await request(server).get('/api/v1/books/')
  
//     // Assert
//     expect(response.status).toBe(500)
//   })
// })

// const getAddBookMockData = [
//   {
//     id: 2,
//     title: 'Harry Potter',
//     author: 'J.K. Rowling'
//   }
// ]

// describe('POST /api/v1/books', () => {
//   it('should add data in the books table', async () => {
//     // Arrange
//     expect.assertions(2)

//     jest.mocked(db.addBook).mockResolvedValue(getAddBookMockData)

//     // Act
//     const response = await request(server).post('/api/v1/books')

//     // Assert
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual(getBooksMockData)
//   })

//   it('should return status 500 and an error message when database fails', async () => {
//     // Arrange
//     expect.assertions(1)
  
//     jest.spyOn(console, 'log').mockImplementation(() => {})
//     jest.mocked(db.getAllBooks).mockRejectedValue(new Error('Mock error message'))
  
//     // Act
//     const response = await request(server).post('/api/v1/books/')
  
//     // Assert
//     expect(response.status).toBe(500)
//   })
})

