const {test,after} = require('node:test')

const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../index')

const api = supertest(app)

test('blogs are returned as json',async()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

})
after(async () => {
    await mongoose.connection.close()
})

test('there are four blogs',async()=>{
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length,6)
})


