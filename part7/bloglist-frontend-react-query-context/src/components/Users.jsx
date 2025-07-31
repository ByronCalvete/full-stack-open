import { useContext } from 'react'
import { Link } from 'react-router-dom'

import UsersListContext from '../context/UsersListContext'

const Users = () => {
  const [ usersList ] = useContext(UsersListContext)

  if (!usersList) return null

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {
            usersList.map(user => (
              <tr key={user.id}>
                <td><Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs?.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Users
