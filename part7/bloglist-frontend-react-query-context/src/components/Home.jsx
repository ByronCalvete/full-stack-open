import Togglable from './Togglable'
import BlogList from './BlogList'
import BlogForm from './BlogForm'

const Home = ({ addBlog, blogs, addLike, handleDelete, userLogged }) => {
  return (
    <>
      <Togglable buttonLabel='new note'>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <BlogList
        blogs={blogs}
        handleLike={addLike}
        handleDelete={handleDelete}
        userLogged={userLogged}
      />
    </>
  )
}

export default Home
