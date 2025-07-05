import Blog from './Blog'

const BlogList = ({ blogs, handleLike }) => {
  // console.log('Initial', blogs)

  // const sortedBlogs = blogs.sort((a,b) => a.likes - b.likes)

  // console.log('Sorted', sortedBlogs)

  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {
          blogs
            .sort((a,b) => b.likes - a.likes)
            .map(blog => (
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
