import { useState, useEffect } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(returnedBlogs => {
        setBlogs(returnedBlogs)
      })
  }, [])

  const handleLogin = (userLogged) => {
    window.localStorage.setItem('blogListUserLogged', JSON.stringify(userLogged))
    setUser(userLogged)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUserLogged')
    setUser(null)
  }
  
  return (
    <div>
      <h1>Bloglist App</h1>
      {
        (user === null || user.token === undefined)
          ? <LoginForm logUser={handleLogin}/>
          : <div>
              <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
              <BlogList blogs={blogs} />
            </div>
      }
    </div>
  )
}

export default App
