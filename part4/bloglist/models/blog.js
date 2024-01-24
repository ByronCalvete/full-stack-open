const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    required: true
  },
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
