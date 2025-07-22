import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [ ...anecdotes, newAnecdote ])
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <>
      <h3>Create new</h3>
      <form onSubmit={onCreate} style={{ marginBottom: 10 }}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
