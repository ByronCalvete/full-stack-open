import { useDispatch } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(showNotification(`You create the anecdote '${content}'`))
    setTimeout(() => {
      dispatch(hideNotification(''))
    }, 5000)
  }
  
  return (
    <>
      <h3>Create new anecdote</h3>
      <form onSubmit={createAnecdote}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
