import { useState, useEffect } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

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
        setSuccessMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUserLogged')
    setUser(null)
  }
  
  return (
    <div>
      <h1>Bloglist App</h1>
      { successMessage && <Notification message={successMessage} type='success' /> }
      { errorMessage && <Notification message={errorMessage} type='error' /> }
      {
        (user === null || user.token === undefined)
          ? <LoginForm
              logUser={handleLogin}
              message={setErrorMessage}
            />
          : <div>
              <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
              <BlogForm createBlog={addBlog}/>
              <BlogList blogs={blogs} />
            </div>
      }
    </div>
  )
}

export default App
