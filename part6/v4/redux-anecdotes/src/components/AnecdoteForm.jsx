import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification(`You create the anecdote '${content}'`))
    setTimeout(() => {
      dispatch(hideNotification(''))
    }, 5000)
  }
  
  return (
    <>
      <h3>Create new anecdote</h3>
      <form onSubmit={handleSubmit}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
