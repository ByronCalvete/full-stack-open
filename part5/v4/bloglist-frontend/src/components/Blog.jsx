import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const { title, author, url, likes, user } = blog

  const [ showDetails, setShowDetails ] = useState(false)

  const buttonLabel = showDetails ? 'hide' : 'view'

  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  return (
    <li className='blog'>
      <div style={hideWhenVisible}>
        <p>{title} - {author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{title} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
        <p>{url}</p>
        <p>likes {likes} <button onClick={() => handleLike(blog.id)}>like</button></p>
        <p>{user.name}</p>
      </div>
    </li>
  )
}

export default Blog
