const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type === 'success' ? 'messageSuccess' : 'errorMessage'}>
      {message}
    </div>
  )
}

export default Notification
