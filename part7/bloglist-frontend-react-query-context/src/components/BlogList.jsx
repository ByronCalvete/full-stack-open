import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleDelete, userLogged }) => {
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
                handleDelete={handleDelete}
                userLogged={userLogged}
              />
            ))
        }
      </ul>
    </>
  )
}

export default BlogList
