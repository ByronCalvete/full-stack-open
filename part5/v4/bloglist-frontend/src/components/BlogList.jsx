import Blog from './Blog'

const BlogList = ({ blogs, handleLike }) => {
  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {
          blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike} 
            />
          ))
        }
      </ul>
    </>
  )
}

export default BlogList
