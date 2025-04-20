const { test, after} = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('Blogs length is 8', async () => {
  const response = await api
    .get('/api/blogs')
    .catch(error =>{
      console.log(error)
    })
  
  assert.strictEqual(response.body.length,8)
  
    
})


test(async () => {
  const mongoose = require('mongoose')
  await mongoose.connection.close()
})