import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog render title and author by default', () => {
  const blog = {
    title: 'I am a title',
    author: 'I am an author',
    url: 'I am an url',
    likes: 2
  }

  render(<Blog blog={blog} />)

  const titleAuthor = screen.getByText(`${blog.title} ${blog.author}`)
  expect(titleAuthor).toBeDefined()

  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(blog.likes)
  expect(url).toBeNull()
  expect(likes).toBeNull()
})