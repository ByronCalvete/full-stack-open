import { useState } from 'react'

const TopAnecdote = ({ anecdote, value }) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdote}</p>
      <p>has {value} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(new Array(8).fill(0))

  const handleClickAnecdote = () => {
    const newAnecdoteIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(newAnecdoteIndex)
  }

  const handleClickVote = () => {
    const copyWithVote = [...votes]
    copyWithVote[selected] += 1
    setVotes(copyWithVote)
  }

  const maxIndex = Math.max(...votes) 
  const maxIndexVoted = votes.indexOf(maxIndex)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickAnecdote}>Next anecdote</button>
      {
        maxIndex > 0
          ? <TopAnecdote anecdote={anecdotes[maxIndexVoted]} value={votes[maxIndexVoted]}/>
          : <p>Vote for you favorite anecdote 🤘🏼</p>
      }
    </div>
  )
}

export default App
