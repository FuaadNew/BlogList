const express = require('express')
const {Blog} = require('./models/mongo')

const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})




//blogItem.save().then((result) => {
   //console.log(blogItem)
//})



app.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  await blog.save()
  response.status(201).json(blog)
})





if (require.main == module) {
  const PORT = 3003
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
}



module.exports = app