import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog render title and author by default', () => {
  const blog = {
    title: 'I am a title',
    author: 'I am an author',
    url: 'I am an url',
    likes: 2,
    user: {
      username: 'username',
      name: 'name',
      id: '2263jhgfjk234jhg'
    }
  }

  render(<Blog blog={blog} />)

  const titleAuthor = screen.getByText(`${blog.title} ${blog.author}`)
  expect(titleAuthor).toBeDefined()

  const url = screen.queryByText(`${blog.url}`)
  const likes = screen.queryByText(`${blog.likes}`)
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('check url and likes when click the view button', async () => {
  const blog = {
    title: 'I am a title',
    author: 'I am an author',
    url: 'I am an url',
    likes: 2,
    user: {
      username: 'username',
      name: 'name',
      id: '2263jhgfjk234jhg'
    }
  }
  const user = {
    name: 'The name',
    username: 'The username',
    toke: 'thetoken'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const userClick = userEvent.setup()
  const button = screen.getByText('view')
  await userClick.click(button)

  const titleAuthor = container.querySelector('.title-author')
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(titleAuthor).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(url).toHaveTextContent(`${blog.url}`)
  expect(likes).toHaveTextContent(`likes ${blog.likes}`)
})