import ReactDOM from 'react-dom/client'
import { NotificationContextProvider } from './context/NotificationContext'
import { UserContextProvider } from './context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
