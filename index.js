const express = require('express')
const {Blog} = require('./models/mongo')

const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})


const blogItem = new Blog({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
})


blogItem.save().then((result) => {
    console.log(result)
})



app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})



const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})