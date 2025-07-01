const { test, after, beforeEach, describe } = require('node:test')
const assert =  require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({})

    // const noteObjects = helper.initialNotes
    //   .map(note => new Note(note))
    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray)

    for (let note of helper.initialNotes) {
      let noteObject = new Note(note)
      await noteObject.save()
    }

    // await Note.insertMany(helper.initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert.strictEqual(contents.includes('HTML is easy'), true)
  })

  describe('viewing a specific note', () => {
    test('success with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('test with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '6234789623897ghfasjg'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('a valid note can be added', async () => {
      const user = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const token = user._body.token

      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      const contents = notesAtEnd.map(e => e.content)

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('note without content is not added', async () => {
      const user  = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const token = user._body.token

      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', async () => {
    test('a note can be deleted', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()
      const contents = notesAtEnd.map(note => note.content)

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
      assert(!contents.includes(noteToDelete.content))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
