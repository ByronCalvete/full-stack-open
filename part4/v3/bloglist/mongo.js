const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@project-v3.1dqav.mongodb.net/testBlogList?retryWrites=true&w=majority&appName=project-v3`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// const blog = new Blog({
//   title: 'My second blog for testing',
//   author: 'Rocky Calvete',
//   url: 'www.rockycalvete.com',
//   likes: 7
// })

// blog.save()
//   .then(result => {
//     console.log('blog saved!')
//     mongoose.connection.close()
//   })

Blog.find({})
  .then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
