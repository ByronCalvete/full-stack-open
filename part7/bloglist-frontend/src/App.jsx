import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

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
        dispatch(setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author}`, 3000))
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
      { (notification && user !== null) && <Notification message={notification} type='success' /> }
      { (notification && user === null) && <Notification message={notification} type='error' /> }
      {
        (user === null || user.token === undefined)
          ? <LoginForm
            logUser={handleLogin}
            // message={setErrorMessage}
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
