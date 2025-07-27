import { useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  backgroung: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

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
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )}
      </ul>
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
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <Button type='submit'>login</Button>
      </form>
    </div>
  )
}

const AppStyledComponents = () => {
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

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
  }

  const padding = { padding: 5 }

  return (
    <Page>
      <Navigation>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to='/login'>login</Link>
        }
      </Navigation>

      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer>
        <em>Note app, Department of Computer Science 2025</em>
      </Footer>
    </Page>
  )
}

export default AppStyledComponents
