import { useDispatch, useSelector } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter !== '') {
      return anecdotes.filter(anecdote => (
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      ))
    }
    return anecdotes
  })

  const handleClick = (id) => {
    const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
    const newAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    dispatch(addVote(id, newAnecdote))
    dispatch(setNotification(`You voted '${newAnecdote.content}'`, 2))
  }

  return (
    <>
      {[... anecdotes ]
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleClick(anecdote.id)}>vote</button>
            </div>
          </div>
      )}
    </>
  )
}

export default AnecdoteList
