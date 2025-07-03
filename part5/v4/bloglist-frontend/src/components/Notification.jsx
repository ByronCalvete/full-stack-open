const Notification = ({ message, type }) => {
  return (
    <div className={type === 'success' ? 'successText' : 'errorText'}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
