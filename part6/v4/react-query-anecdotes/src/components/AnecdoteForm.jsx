const AnecdoteForm = () => {
  const onCreate = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    console.log('new anecdote')
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
