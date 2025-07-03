const Blog = ({ blog }) => {
  const { title, author } = blog

  return (
    <li>{title} - {author}</li>
  )
}

export default Blog
