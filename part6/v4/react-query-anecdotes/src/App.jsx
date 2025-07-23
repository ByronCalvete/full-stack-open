import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const [ notification, dispatch ] = useContext(NotificationContext)

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote: anecdote))
      // queryClient.invalidateQueries({ queryKeys: ['anecdotes'] })
      dispatch({ type: 'SET', payload: `anecdote '${updatedAnecdote.content}' voted` })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    }
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const anecdotes = result.data

  return (
    <>
      <h3>Anecdote app</h3>
      {notification && <Notification />}
      <AnecdoteForm />
      {anecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>vote</button>            
          </div>
        </div>
      )}
    </>
  )
}

export default App
