import { useState, useEffect } from 'react'

import Note from './componets/Note'
import Notification from './componets/Notification'
import Footer from './componets/Footer'
import LoginForm from './componets/LoginForm'
import NoteForm from './componets/NoteForm'

import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const userLogged = await loginService.login({
        username, password
      })

      noteService.setToken(userLogged.token)
      setUser(userLogged)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage(exception.response.data.error) // -> This is the message from backend
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes([ ...notes, returnedNote ])
        setNewNote('')
      })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {
        user === null
          ? <LoginForm
              username={username}
              password={password}
              handleSubmit={handleLogin}
              onChangeUsername={({ target }) => setUsername(target.value)}
              onChangePassword={({ target }) => setPassword(target.value)}
            />
          : (<div>
              <p>{user.name} loggen-in</p>
              <NoteForm
                handleSubmit={addNote}
                newNote={newNote}
                handleChange={handleNoteChange}
              />
            </div>)
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </>
  )
}

export default App
