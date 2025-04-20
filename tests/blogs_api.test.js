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

test('Blogs id attribute is id not _id', async () => {
  const response = await api
    .get('/api/blogs')
    .catch(error =>{
      console.log(error)
    })
  
    
    if (!response.body || response.body.length === 0){
      assert.fail('No Blogs returned')
    }
    assert(response.body.length > 0)
    assert.notStrictEqual(response.body[0].id, undefined, 'id should be defined')
    assert.strictEqual(response.body[0]._id, undefined, '_id should not be defined')
  
    
})



test(async () => {
  const mongoose = require('mongoose')
  await mongoose.connection.close()
})