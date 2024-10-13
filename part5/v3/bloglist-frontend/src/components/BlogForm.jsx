import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            data-testid='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            data-testid='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            data-testid='url'
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write url'
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
