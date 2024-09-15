const Notification = ({ message, type }) => {
  return (
    <p className={type === 'success' ? 'success' : 'error'}>
      {message}
    </p>
  )
}

export default Notification
