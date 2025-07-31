import { useEffect, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import NotificationContext from './context/NotificationContext'
import UserContext from './context/UserContext'

const App = () => {
  // const [ user, setUser ] = useState(null)
  const queryClient = useQueryClient()

  const [ user, userDispatch ] = useContext(UserContext)
  const [ notification, dispatch ] = useContext(NotificationContext)

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      // queryClient.invalidateQueries({ queryKey: ['blogs'] })
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [ ...blogs, newBlog ])
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      // queryClient.invalidateQueries({ queryKey: ['blogs'] })
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      queryClient.setQueryData(['blogs'], newBlogs)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogListUserLogged')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOG_IN', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject)
    dispatch({ type: 'SET', payload: `A new blog ${blogObject.title} by ${blogObject.author}` })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 3000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUserLogged')
    userDispatch({ type: 'LOG_OUT' })
  }

  const addLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    updateBlogMutation.mutate(updatedBlog)
  }

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(id)
    }
  }

  // Get all blocks with React Query
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>Loading blogs...</div>
  }

  const blogs = result.data

  return (
    <div>
      <h1>Bloglist App</h1>
      { (notification && user) && <Notification type='success' /> }
      { (notification && !user) && <Notification type='error' /> }
      {
        (user === null || user.token === undefined)
          ? <LoginForm />
          : <div>
            <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
            <Togglable buttonLabel='new note'>
              <BlogForm createBlog={addBlog}/>
            </Togglable>
            <BlogList
              blogs={blogs}
              handleLike={addLike}
              handleDelete={handleDelete}
              userLogged={user}
            />
          </div>
      }
    </div>
  )
}

export default App
