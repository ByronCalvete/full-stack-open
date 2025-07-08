import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> onSubmit with right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write a title')
  const inputAuthor = screen.getByPlaceholderText('write an author')
  const inputUrl = screen.getByPlaceholderText('write an url')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'This is a title')
  await user.type(inputAuthor, 'This is an author')
  await user.type(inputUrl, 'This is an url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is a title')
  expect(createBlog.mock.calls[0][0].author).toBe('This is an author')
  expect(createBlog.mock.calls[0][0].url).toBe('This is an url')
})
