import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { NotificationContextProvider } from './context/NotificationContext'
import { UserContextProvider } from './context/UserContext'
import { UserListContextProvider } from './context/UsersListContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserListContextProvider>
        <UserContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </UserContextProvider>
      </UserListContextProvider>
    </QueryClientProvider>
  </Router>
)
