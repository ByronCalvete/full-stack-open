import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> onSubmit with the right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write title')
  const inputAuthor = screen.getByPlaceholderText('write author')
  const inputUrl = screen.getByPlaceholderText('write url')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'testing title')
  await user.type(inputAuthor, 'testing author')
  await user.type(inputUrl, 'testing url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})
