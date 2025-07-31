import { useState, useEffect } from 'react'

import userService from '../services/users'

const Users = () => {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    userService.getAllUsers()
      .then(allUsers =>
        setUsers(allUsers)
      )
  }, [])

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
            users.map(user =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default Users
