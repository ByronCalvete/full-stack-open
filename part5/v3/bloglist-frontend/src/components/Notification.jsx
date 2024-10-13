const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <p className={type === 'success' ? 'success' : 'error'}>
      {message}
    </p>
  )
}

export default Notification
