const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://coursedata:${password}@clusterforcoursedata.szvwi4y.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const personToAdd = {
  name: process.argv[3],
  number: process.argv[4],
}

const person = new Person({
  name: personToAdd.name,
  number: personToAdd.number,
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  person.save().then(result => {
    console.log(`added ${personToAdd.name} number ${personToAdd.number} to phonebook`)
    mongoose.connection.close()
  })
}
