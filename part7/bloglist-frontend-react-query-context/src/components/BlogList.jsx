import { Link } from 'react-router-dom'

const BlogList = ({ blogs = [] }) => {
  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {
          blogs
            .sort((a,b) => b.likes - a.likes)
            .map(blog => (
              <li key={blog.id} className='blog'>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
              // <Blog
              //   key={blog.id}
              //   blog={blog}
              //   handleLike={handleLike}
              //   handleDelete={handleDelete}
              //   userLogged={userLogged}
              // />
            ))
        }
      </ul>
    </>
  )
}

export default BlogList
