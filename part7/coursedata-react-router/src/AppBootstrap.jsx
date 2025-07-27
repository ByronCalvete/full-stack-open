import { useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'

import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

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
      <Table striped>
        <tbody>
          {notes.map(note =>
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </td>
              <td>
                {note.user}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          login
        </Button>
      </Form>
    </div>
  )
}

const AppBootstrap = () => {
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

  const padding = { padding: 5 }

  return (
    <div className='container'>
      {message &&
        <Alert variant='success'>
          {message}
        </Alert>
      }
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>home</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/notes'>notes</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              {user
                ? <em>{user} logged in</em>
                : <Link style={padding} to='/login'>login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

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
    </div>
  )
}

export default AppBootstrap
