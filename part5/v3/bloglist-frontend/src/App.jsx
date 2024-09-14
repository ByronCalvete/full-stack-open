import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Failed login')
    }
  }

  const handleLoginOut = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs([ ...blogs, returnedBlog ])
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  return (
    <>
      {
        user === null
          ? <LoginForm
              username={username}
              password={password}
              handleSubmit={handleLogin}
              handleChangeUsername={({ target }) => setUsername(target.value)}
              handleChangePassword={({ target }) => setPassword(target.value)}
            />
          : (<div>
              <h2>blogs</h2>
              <p>
                {user.name} logged in
                <button onClick={handleLoginOut}>logout</button>
              </p>
              <BlogForm
                title={title}
                author={author}
                url={url}
                handleSubmit={addBlog}
                onChangeTitle={({ target }) => setTitle(target.value)}
                onChangeAuthor={({ target }) => setAuthor(target.value)}
                onChangeUrl={({ target }) => setUrl(target.value)}
              />
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>)
      }
    </>
  )
}

export default App