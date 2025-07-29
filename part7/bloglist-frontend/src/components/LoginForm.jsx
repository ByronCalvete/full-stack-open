import { useState } from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({ logUser }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      logUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setPassword('')
      setUsername('')
      dispatch(setNotification('Wrong username or password', 3000))
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
