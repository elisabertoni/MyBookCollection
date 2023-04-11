import nock from 'nock'
import { MemoryRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, within, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'
import { initialiseStore } from '../store'

const store = initialiseStore()

it('should update a book from the list', async () => {
  const scope = nock('http://localhost')
    .get('/api/v1/books')
    .reply(200, [
      { id: 1, title: 'The Catcher in the Rye', author: 'J.D.Salinger' },
      { id: 2, title: 'It Ends with Us', author: 'Colleen Hoover' },
      {
        id: 3,
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K.Rowling',
      },
      {
        id: 4,
        title: 'The Lion, the Witch, and the Wardrobe',
        author: 'C.S. Lewis',
      },
      { id: 5, title: 'Normal People', author: 'Sally Rooney' },
      { id: 6, title: 'The Duke and I', author: 'Julia Quinn' },
      { id: 7, title: 'Girls That Invest', author: 'Simran Kaur' },
      {
        id: 8,
        title: 'My Darling Lemon Thyme: Every Day',
        author: 'Emma Galloway',
      },
      { id: 9, title: 'Search Inside Yourself', author: ' Chade-Meng Ta' },
      {
        id: 10,
        title: 'Homegrown Kitchen: Everyday Recipes for Eating Well',
        author: 'Nicola Galloway',
      },
      {
        id: 11,
        title:
          'Healthy Baking: Nourishing breads, wholesome cakes, ancient grains and bubbling ferments',
        author: 'Jordan Bourke',
      },
    ])

  // const bookId = '3'
  const scope1 = nock('http://localhost')
    .patch(`/api/v1/books/3`)
    .reply(200, [
      { id: 1, title: 'The Catcher in the Rye', author: 'J.D.Salinger' },
      { id: 2, title: 'It Ends with Us', author: 'Colleen Hoover' },
      {
        id: 3,
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
      },
      {
        id: 4,
        title: 'The Lion, the Witch, and the Wardrobe',
        author: 'C.S. Lewis',
      },
      { id: 5, title: 'Normal People', author: 'Sally Rooney' },
      { id: 6, title: 'The Duke and I', author: 'Julia Quinn' },
      { id: 7, title: 'Girls That Invest', author: 'Simran Kaur' },
      {
        id: 8,
        title: 'My Darling Lemon Thyme: Every Day',
        author: 'Emma Galloway',
      },
      { id: 9, title: 'Search Inside Yourself', author: ' Chade-Meng Ta' },
      {
        id: 10,
        title: 'Homegrown Kitchen: Everyday Recipes for Eating Well',
        author: 'Nicola Galloway',
      },
      {
        id: 11,
        title:
          'Healthy Baking: Nourishing breads, wholesome cakes, ancient grains and bubbling ferments',
        author: 'Jordan Bourke',
      },
      {
        id: 12,
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
      },
    ])

  render(
    <Router initialEntries={['/']}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  )

  const updateButton = await screen.findAllByRole('button', {
    name: 'Update',
  })

  act(() => {
    userEvent.click(updateButton[2])
  })

  const form = await screen.findByRole('form', { name: 'Update Book' })
  await waitFor(() => expect(scope.isDone()).toBeTruthy())

  const BookTitleInput = within(form).getByLabelText('Book Title')
  const UpdateButton = within(form).getByRole('button', {
    name: 'Update Book',
  })

  act(() => {
    userEvent.type(BookTitleInput, 'Harry Potter and the Chamber of Secrets')
    userEvent.click(UpdateButton)
  })

  await waitFor(() => expect(scope1.isDone()).toBeTruthy())

  const newBooksList = await screen.findAllByRole('listitem')
  expect(newBooksList[2]).toHaveTextContent('Chamber')
})
