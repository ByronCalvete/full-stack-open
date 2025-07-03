import { useState } from 'react'

import loginService from '../services/login'

const LoginForm = ({ logUser, errorMessage }) => {
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
      errorMessage('Wrong credentials')
      setTimeout(() => {
        errorMessage(null)
        setPassword('')
      }, 3000)
    }
  }

  return (
    <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
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
