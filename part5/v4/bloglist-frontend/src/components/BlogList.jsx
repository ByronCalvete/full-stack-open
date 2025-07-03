import Blog from './Blog'

const BlogList = ({ blogs }) => {
  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {
          blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog} 
            />
          ))
        }
      </ul>
    </>
  )
}

export default BlogList
