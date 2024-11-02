import { useState } from 'react'

import loginService from '../services/login'

const LoginForm = ({ logUser, errorMessage }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    loginService.login({ username, password })
      .then(credentials => {
        logUser(credentials)
      })
      .catch(error => {
        errorMessage('Wrong Credentials')
        setTimeout(() => {
          errorMessage(null)
        }, 3000)
      })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          id='username'
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
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )
}

export default LoginForm
