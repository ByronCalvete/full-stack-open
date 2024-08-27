const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@project-v3.1dqav.mongodb.net/noteApp?retryWrites=true&w=majority&appName=project-v3`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  importante: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'MongoDB is a good database',
//   importante: false
// })

// note.save()
//   .then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })

Note.find({ importante: false })
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
