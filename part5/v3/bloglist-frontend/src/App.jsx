import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import ListBlogs from './components/ListBlogs'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username, password
      })

      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Failed login')
    }
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
          : <ListBlogs
              blogs={blogs}
            />
      }
    </>
  )
}

export default App