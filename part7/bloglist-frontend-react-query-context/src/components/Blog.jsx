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
              <p className='title'>{title} - {author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
            </div>
          )
          : (
            <div>
              <p className='title'>{title} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
              <p className='url'>{url}</p>
              <p className='likes'>likes {likes} <button className='like_button' onClick={() => handleLike(blog.id)}>like</button></p>
              <p className='user'>{user.name}</p>
              { userLogged?.username === blog.user.username && <button onClick={() => handleDelete(blog.id)}>remove</button>}
            </div>
          )
      }
    </li>
  )
}

export default Blog
