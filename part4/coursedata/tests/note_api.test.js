const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})
  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }

  // // Another way to do this with Promise.all
  // const noteObjects = helper.initialNotes.map(note => new Note(note))
  // const promiseArray = noteObjects.map(note => note.save())
  // await Promise.all(promiseArray)
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(note => note.content)
    expect(contents).toContain(
      'Browser can execute only JavaScript'
    )
  })
})

describe('viewing a specific note', () => {
  test('success with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })

  test('fails with statuscode 400 if note does not exists', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(400)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('success with valid data', async () => {
    const users = await helper.usersInDb()
    const id = users[0].id

    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
      userId: id
    }

    const res = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)

    const token = res._body.token

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    const contents = notesAtEnd.map(r => r.content)

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fails with status code 400 if data invalid', async () => {
    const users = await helper.usersInDb()
    const id = users[0].id

    const newNote = {
      important: true,
      userId: id
    }

    const res = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)

    const token = res._body.token

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()
    const contents = notesAtEnd.map(r => r.content)

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)
  })
})

describe('updating a note', () => {
  test('a note can be updated', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteUpdated = { ...notesAtStart[0], content: 'Hi my friends!' }

    await api
      .put(`/api/notes/${noteUpdated.id}`)
      .send(noteUpdated)
      .expect(200)

    const notesAtEnd = await helper.notesInDb()
    const contents = notesAtEnd.map(r => r.content)
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    expect(contents).toContain('Hi my friends!')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
