import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, userLogged }) => {
  const { title, author, url, likes, user } = blog

  const [ showDetails, setShowDetails ] = useState(true)

  const buttonLabel = showDetails ? 'view' : 'hide'

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  return (
    <li className='blog'>
      {
        showDetails
          ? (
            <div>
              <p>{title} - {author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
            </div>
          )
          : (
            <div>
              <p>{title} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
              <p>{url}</p>
              <p>likes {likes} <button onClick={() => handleLike(blog.id)}>like</button></p>
              <p>{user.name}</p>
              { userLogged?.username === blog.user.username && <button onClick={() => handleDelete(blog.id)}>remove</button>}
            </div>
          )
      }
    </li>
  )
}

export default Blog
