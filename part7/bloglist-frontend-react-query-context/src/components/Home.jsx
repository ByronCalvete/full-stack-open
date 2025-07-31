import Togglable from './Togglable'
import BlogList from './BlogList'
import BlogForm from './BlogForm'

const Home = ({ addBlog, blogs }) => {
  return (
    <>
      <Togglable buttonLabel='new note'>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <BlogList blogs={blogs} />
    </>
  )
}

export default Home
