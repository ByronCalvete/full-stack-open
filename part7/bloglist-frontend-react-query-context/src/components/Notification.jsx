import { useNotificationValue } from '../hooks'

const Notification = ({ type }) => {
  const notification = useNotificationValue()

  return (
    <div className={type === 'success' ? 'successText' : 'errorText'}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
