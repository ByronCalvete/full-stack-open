const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (request, returedObject) => {
    returedObject.id = returedObject._id.toString()
    delete returedObject._id
    delete returedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
