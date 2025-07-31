import { createContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch(action.type) {
  case 'GET_ALL':
    return action.payload
  default:
    return state
  }
}

const UsersListContext = createContext()

export const UserListContextProvider = (props) => {
  const [ usersList, userListDispatch ] = useReducer(userReducer, null)

  return (
    <UsersListContext.Provider value={[ usersList, userListDispatch ]}>
      {props.children}
    </UsersListContext.Provider>
  )
}

export default UsersListContext