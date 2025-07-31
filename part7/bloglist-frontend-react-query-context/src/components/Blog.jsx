const Blog = ({ blog, handleLike }) => {
  return (
    <>
      <h2>{blog?.title}</h2>
      <a href=''>{blog?.url}</a>
      <div>{blog?.likes} likes <button className='like_button' onClick={() => handleLike(blog.id)}>like</button></div>
      <div>added by {blog?.user.name}</div>
    </>
  )
}

export default Blog
