import { useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'
import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Button, Alert, Toolbar, AppBar, IconButton } from '@mui/material'

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, porro! Libero, quos suscipit quasi quam a repellendus numquam dolore expedita magni ab praesentium deserunt minima placeat eos totam cumque accusamus.</p>
    </div>
  )
}

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map(note =>
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>
                  {note.user}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
const Users = () => {
  return (
    <div>
      <h2>TKTL noste app</h2>
      <ul>
        <li>Rocky Calvete</li>
        <li>El Loco de la Calle</li>
        <li>Magic Johnson</li>
      </ul>
    </div>
  )
}

const Login = (props) => {
  const navigate = useNavigate()
  
  const onSubmit = (e) => {
    e.preventDefault()
    props.onLogin('rocky')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label='username' />
        </div>
        <div>
          <TextField label='password' type='password' />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          login
        </Button>
      </form>
    </div>
  )
}

const AppMaterialUI = () => {
  const [ notes, setNotes ] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Rocky Calvete'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'El Loco de la Calle'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Magic Johnson'
    }
  ])

  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState(null)

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  return (
    <Container>
      {message && (
        <Alert severity='success'>
          {message}
        </Alert>
      )}

      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
          <Button color='inherit' component={Link} to='/'>
            home
          </Button>
          <Button color='inherit' component={Link} to='/notes'>
            notes
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
          {user
            ? <em>{user} logged in</em>
            : <Button color='inherit' component={Link} to='/login'>
                login
              </Button>
          }
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <footer>
        <br />
        <em>Note app, Department of Computer Science 2025</em>
      </footer>
    </Container>
  )
}

export default AppMaterialUI
