const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
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
})

describe('what there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const reponse = await api.get('/api/notes')
    const contents = reponse.body.map(note => note.content)

    assert.strictEqual(contents.includes('HTML is easy'), true)
    // assert(contents.includes('HTML is easy')) //-> shorter form
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/note/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = 'bd4326534n13246i5j123'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const users = await helper.usersInDb()

    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
      userId: users[0].id
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(note => note.content)
    assert.strictEqual(contents.includes('async/await simplifies making async calls'), true)
  })

  test('fails with status code 400 if data invalid', async () => {
    const users = await helper.usersInDb()

    const newNote = {
      important: true,
      userId: users[0].id
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const noteAtStart = await helper.notesInDb()
    const noteToDelete = noteAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()

    const contents = notesAtEnd.map(note =>  note.contents)
    assert.strictEqual(!contents.includes(noteToDelete.content), true)
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
  })
})

describe('update a note', () => {
  test('succeeds with status code 200 if note is updated', async () => {
    const notesAtStart = await api.get('/api/notes')
    const updatedNote = { ...notesAtStart.body[0], important: true }

    await api
      .put(`/api/notes/${updatedNote.id}`)
      .send(updatedNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await api.get('/api/notes')
    assert.strictEqual(notesAtEnd.body[0].important, true)
  })
})

after(async () => {
  await mongoose.connection.close()
})
