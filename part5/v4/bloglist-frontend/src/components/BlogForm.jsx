import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write a title'
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write an author'
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write an url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
