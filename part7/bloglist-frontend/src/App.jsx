import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, liked, blogToDelete } from './reducers/blogReducer'

const App = () => {
  const [ user, setUser ] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
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
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author}`, 3000))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUserLogged')
    setUser(null)
  }

  const addLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    dispatch(liked(id, updatedBlog))
  }

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(blogToDelete(id))
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
              blogs={[ ...blogs ]}
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
