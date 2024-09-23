import { useState } from 'react'

const Blog = ({ blog, handleLikesClick, user, handleDeleteClick }) => {
  const [ showDetails, setShowDetails ] = useState(true)

  const handleClick = () => setShowDetails(!showDetails)

  return (
    <div className='blog'>
      {
        showDetails
          ? (<>
              <p className='blog-detail'>
                {blog.title}
                <button onClick={handleClick}>view</button>
              </p>
            </>)
          : (<>
              <p className='blog-detail'>
                {blog.title}
                <button onClick={handleClick}>hide</button>
              </p>
              <p className='blog-detail'>{blog.url}</p>
              <p className='blog-detail'>
                likes {blog.likes}
                <button onClick={() => handleLikesClick(blog.id)}>like</button>
              </p>
              <p className='blog-detail'>{blog.author}</p>
              {user.username === blog.user.username && <button onClick={() => handleDeleteClick(blog.id)}>remove</button>}
            </>)
      }
    </div>
  ) 
}

export default Blog