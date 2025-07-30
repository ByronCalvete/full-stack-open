import { useState, useEffect, useContext } from 'react'
import NotificationContext from './NotificationContext'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  // const [ successMessage, setSuccessMessage ] = useState(null)
  // const [ errorMessage, setErrorMessage ] = useState(null)

  const [ notification, dispatch ] = useContext(NotificationContext)

  useEffect(() => {
    blogService
      .getAll()
      .then(returnedBlogs => {
        setBlogs(returnedBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogListUserLogged')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (userLogged) => {
    window.localStorage.setItem('blogListUserLogged', JSON.stringify(userLogged))
    blogService.setToken(userLogged.token)
    setUser(userLogged)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs([ ...blogs, returnedBlog ])
        dispatch({ type: 'SET', payload: `A new blog ${returnedBlog.title} by ${returnedBlog.author}` })
        setTimeout(() => {
          dispatch({ type: 'HIDE' })
        }, 3000)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUserLogged')
    setUser(null)
  }

  const addLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
      })
  }

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  return (
    <div>
      <h1>Bloglist App</h1>
      { (notification && user) && <Notification type='success' /> }
      { (notification && !user) && <Notification type='error' /> }
      {
        (user === null || user.token === undefined)
          ? <LoginForm
            logUser={handleLogin}
          />
          : <div>
            <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
            <Togglable buttonLabel='new note'>
              <BlogForm createBlog={addBlog}/>
            </Togglable>
            <BlogList
              blogs={blogs}
              handleLike={addLike}
              handleDelete={handleDelete}
              userLogged={user}
            />
          </div>
      }
    </div>
  )
}

export default App
