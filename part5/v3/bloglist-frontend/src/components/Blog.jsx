import { useState } from 'react'

const Blog = ({ blog, handleLikesClick, user, handleDeleteClick }) => {
  const [ showDetails, setShowDetails ] = useState(true)

  const handleClick = () => setShowDetails(!showDetails)

  return (
    <div className='blog'>
      {
        showDetails
          ? (<>
            <p className='blog-detail title-author'>
              {blog.title} {blog.author}
              <button onClick={handleClick}>view</button>
            </p>
          </>)
          : (<>
            <p className='blog-detail title-author'>
              {blog.title} {blog.author}
              <button onClick={handleClick}>hide</button>
            </p>
            <p className='blog-detail url'>{blog.url}</p>
            <p className='blog-detail likes'>
                likes {blog.likes}
              <button onClick={() => handleLikesClick(blog.id)}>like</button>
            </p>
            <p className='blog-detail user'>{blog.user.name}</p>
            {user.username === blog.user.username && <button onClick={() => handleDeleteClick(blog.id)}>remove</button>}
          </>)
      }
    </div>
  )
}

export default Blog