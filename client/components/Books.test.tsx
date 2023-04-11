import nock from 'nock'
import { MemoryRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, within, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'
import { initialiseStore } from '../store'

const store = initialiseStore()

describe('Test Book Component', () => {
  it('succesfully show a list of books', async () => {
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

    render(
      <Router initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )

    const listBooks = await screen.findAllByRole('listitem')

    expect(listBooks[0]).toBeVisible()
    expect(listBooks).toHaveLength(11)
    expect(listBooks[0]).toHaveTextContent('Salinger')
    expect(scope.isDone()).toBeTruthy()
  })

  it('should add a new book to the list', async () => {
    const scope1 = nock('http://localhost')
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

    const scope2 = nock('http://localhost')
      .post('/api/v1/books')
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

    const form = await screen.findByRole('form', { name: 'Add Book' })

    await waitFor(() => expect(scope1.isDone()).toBeTruthy())

    const BookTitleInput = within(form).getByLabelText('Book Title:')
    const submitButton = within(form).getByRole('button')

    act(() => {
      userEvent.type(BookTitleInput, 'The Kite Runner')
      userEvent.click(submitButton)
    })

    const bookListItem = await screen.findByText(/Runner/)

    expect(bookListItem).toBeVisible()
    expect(scope2.isDone()).toBeTruthy()
  })


  it('should delete a book from the list', async () => {
    const scope3 = nock('http://localhost')
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

    const bookId = 1
    const scope4 = nock('http://localhost')
    .delete(`/api/v1/books/${bookId}`)
    .reply(200, [
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

    const booksList = await screen.findAllByRole('listitem')
    await waitFor(() => expect(scope3.isDone()).toBeTruthy())
    const deleteButton = within(booksList[0]).getByRole('button', { name: 'Delete' })

    act(() => {
      userEvent.click(deleteButton)
    })

    await waitFor(() => expect(scope4.isDone()).toBeTruthy())
  
    const newBooksList = await screen.findAllByRole('listitem')
    expect(newBooksList).toHaveLength(11)
  })
})
