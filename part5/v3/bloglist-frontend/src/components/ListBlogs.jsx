import Blog from './Blog'

const ListBlogs = ({ blogs, userLogged, handleClick }) => {
  return (
    <>
      <h2>blogs</h2>
      <p>
        {userLogged.name} logged in
        <button onClick={handleClick}>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default ListBlogs
