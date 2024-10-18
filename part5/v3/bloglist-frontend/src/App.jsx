import { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLoginOut = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs([ ...blogs, returnedBlog ])
        setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  const blogFormRef = useRef()

  const updateLikes = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
      })
      .catch(error => {
        setErrorMessage('Error. Likes not updated')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (confirm(`Remove blog ${blog.title}?`)) {
      blogService
        .deleteBlog(id) // This promise do not return data
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  return (
    <>
      {
        user === null
          ? (<div>
            <h2>log in to application</h2>
            {errorMessage && <Notification message={errorMessage} type='error'/>}
            <LoginForm
              username={username}
              password={password}
              handleSubmit={handleLogin}
              handleChangeUsername={({ target }) => setUsername(target.value)}
              handleChangePassword={({ target }) => setPassword(target.value)}
            />
          </div>)
          : (<div>
            <h2>blogs</h2>
            {successMessage && <Notification message={successMessage} type='success' />}
            <p>
              {user.name} logged in
              <button onClick={handleLoginOut}>logout</button>
            </p>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            {blogs
              .sort((a,b) => b.likes - a.likes)
              .map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  handleLikesClick={updateLikes}
                  handleDeleteClick={handleDelete}
                />
              )}
          </div>)
      }
    </>
  )
}

export default App
