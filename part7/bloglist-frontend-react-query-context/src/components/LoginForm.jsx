import { useState } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNotificationDispatch, useUserDispatch } from '../hooks'

const LoginForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const userLogged = await loginService.login({ username, password })
      userDispatch({ type: 'LOG_IN', payload: userLogged })
      window.localStorage.setItem('blogListUserLogged', JSON.stringify(userLogged))
      blogService.setToken(userLogged.token)
    } catch {
      setPassword('')
      setUsername('')
      dispatch({ type: 'SET', payload: 'Wrong username or password' })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    }
  }

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
