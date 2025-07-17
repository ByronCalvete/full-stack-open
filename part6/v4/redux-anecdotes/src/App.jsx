import { useDispatch, useSelector } from 'react-redux'
import { addVote, addNote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const createAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addNote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
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
      <h3>Create new anecdote</h3>
      <form onSubmit={createAnecdote}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
