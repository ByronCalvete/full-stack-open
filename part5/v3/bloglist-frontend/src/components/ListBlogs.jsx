import Blog from './Blog'

const ListBlogs = ({ blogs }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default ListBlogs
