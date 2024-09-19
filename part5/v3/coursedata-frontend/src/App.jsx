import { useState, useEffect, useRef } from 'react'

import Note from './componets/Note'
import Notification from './componets/Notification'
import Footer from './componets/Footer'
import LoginForm from './componets/LoginForm'
import NoteForm from './componets/NoteForm'
import Togglable from './componets/Togglable'

import noteService from './services/notes'

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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = (userLogged) => {
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(userLogged))
    noteService.setToken(userLogged.token)
    setUser(userLogged)
  }

  const handleLoggedOut = (e) => {
    e.preventDefault()
     window.localStorage.removeItem('loggedNoteappUser')
     setUser(null)
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes([ ...notes, returnedNote ])
      })
  }

  const noteFormRef = useRef()

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
          ? <Togglable buttonLabel='login'>
              <LoginForm
                logUser={handleLogin}
                errorMessage={setErrorMessage}
              />
            </Togglable>
          : (<div>
              <p>
                {user.name} loggen-in
                <button onClick={handleLoggedOut}>Logout</button>
              </p>
              <Togglable buttonLabel='new note' ref={noteFormRef}>
                <NoteForm createNote={addNote} />
              </Togglable>
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
