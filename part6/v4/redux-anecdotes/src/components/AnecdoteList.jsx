import { useDispatch, useSelector } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }

    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  
  const vote = (id) => {
    const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
    const anecdoteUpdated = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    dispatch(updateVote(anecdoteUpdated))
    dispatch(showNotification(`You voted '${anecdoteToVote.content}'`))
    setTimeout(() => {
      dispatch(hideNotification(''))
    }, 3000)
  }

  return (
    <>
      {[...anecdotes]
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote => 
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
