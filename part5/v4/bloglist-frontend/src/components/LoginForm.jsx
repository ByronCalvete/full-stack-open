import { useState } from 'react'

import loginService from '../services/login'

const LoginForm = ({ logUser, message }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

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
      message('Wrong username or password')
      setTimeout(() => {
        message(null)
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
