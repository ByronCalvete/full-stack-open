import { useState } from 'react'

const Blog = ({ blog }) => {
  const { title, author, url, likes } = blog

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
        <p>{title} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{title} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
        <p>{url}</p>
        <p>likes {likes}</p>
        <p>{author}</p>
      </div>
    </li>
  )
}

export default Blog
