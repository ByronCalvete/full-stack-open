import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import Notification from './Notification'

const Filter = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const style = { marginBottom: 10 }

  if (!notification) {
    return (
      <div style={style}>
        filter
        <input onChange={(e) => dispatch(filterChange(e.target.value))}/>
      </div>
    )
  }
   return <Notification />
}

export default Filter
