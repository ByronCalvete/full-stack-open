import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog renders title and author by default', () => {
  const blog = {
    title: 'This is the title',
    author: 'This is the author',
    url: 'This is the url',
    likes: 2,
    user: {
      username: 'username',
      name: 'name',
      id: 'afgasifubasfj'
    }
  }

  render(<Blog blog={blog} />)

  const titleAuthor = screen.getByText(`${blog.title} - ${blog.author}`)
  expect(titleAuthor).toBeDefined()

  const url = screen.queryByText(`${blog.url}`)
  const likes = screen.queryByText(`${blog.likes}`)
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('show url and likes when view button was clicked', async () => {
  const blog = {
    title: 'This is the title',
    author: 'This is the author',
    url: 'This is the url',
    likes: 2,
    user: {
      username: 'username',
      name: 'name',
      id: 'adjaouhaso'
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText(`${blog.url}`)
  const likes = screen.getByText(`likes ${blog.likes}`)
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})
