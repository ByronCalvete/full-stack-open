import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleSubmit,
  handleChangeUsername,
  handleChangePassword
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={handleChangeUsername}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={handleChangePassword}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeUsername: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired
}

export default LoginForm
