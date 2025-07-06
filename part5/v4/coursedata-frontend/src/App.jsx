import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import Togglable from './components/Togglable'

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const noteFormRef = useRef()

  const handleLogin = (userLogged) => {
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(userLogged))
    noteService.setToken(userLogged.token)
    setUser(userLogged)
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes([ ...notes, returnedNote ])
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(() => {
        setErrorMessage(`Note ${note.content} was already removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes app</h1>
      {errorMessage && <Notification message={errorMessage} />}

      {
        user === null
          ? <Togglable buttonLabel='login'>
            <LoginForm
              logUser={handleLogin}
              errorMessage={setErrorMessage}
            />
          </Togglable>
          : <div>
            <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel='new note' ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>
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
    </div>
  )
}

export default App
