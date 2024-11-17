import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { makeNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    anecdoteService.createNew(content)
      .then(anecdote => dispatch(createAnecdote(anecdote)))
    dispatch(makeNotification(`Create new note: ${content}`))
    setTimeout(() => {
      dispatch(removeNotification(null))
    }, 2000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
