import { useState } from 'react'

const Blog = ({ blog }) => {
  const [ showDetails, setShowDetails ] = useState(true)

  const handleClick = () => setShowDetails(!showDetails)

  return (
    <div className='blog'>
      {
        showDetails
          ? (<>
              <span>{blog.title}</span>
              <button onClick={handleClick}>view</button>
            </>)
          : (<>
              <span>{blog.title} {blog.author}</span>
              <button onClick={handleClick}>hide</button>
              <br/>
              <span>{blog.url}</span>
              <br/>
              <span>likes {blog.likes} <button>like</button></span>
              <br/>
              <span>{blog.author}</span>
            </>)
      }
    </div>
  ) 
}

export default Blog