import { useDispatch, useSelector } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer'
import { makeNotification, removeNotification } from "../reducers/notificationReducer"

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
    dispatch(addVote(id))
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(makeNotification(`You voted '${votedAnecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification(null))
    }, 2000)
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
