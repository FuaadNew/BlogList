const express = require('express')
const userRouter = require('./controllers/users')
const {Blog} = require('./models/mongo')
const { loginRouter } = require('./controllers/login')
const jwt = require('jsonwebtoken')
const { getTokenFrom } = require('./middleware')

const middleware = require('./middleware')
const app = express()

app.use(middleware.tokenExtractor)

const mongoose = require('mongoose')


app.use(express.json())
app.use('/api/login',loginRouter)
app.use('/api/users', userRouter)

app.get('/api/blogs', async (request, response) => {

 
  const blogs = await Blog.find({})
  response.json(blogs)
})


app.put('/api/blogs/:id', async (req, res) =>{
  try {
    const id = req.params.id
    await Blog.findByIdAndUpdate(id, req.body, {new:true})
    res.status(204).end()
  }
  catch(error){
    res.status(400).json({error: "malformed id"})
  }
})

app.delete('/api/blogs/:id', async (request,response)=>{

  const decodedToken = jwt.verify(getTokenFrom(request),process.env.secret)

  if (!decodedToken){
    response.status(400).json({error: "invalid token"})

  }

  if (!(decodedToken.id)){
    response.status(400).json({error: "invalid token"})
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog){
    response.status(400).json({error: "No Blog Found" })
  }

  if( blog.user.toString()!= decodedToken.id.toString()){
    response.status(400).json({error: "only the blog creater can delete this blog"})


  }
  
  try {const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
  }catch (error) {
    response.status(400).json({error: 'malformed id'})

  }

  

})




//blogItem.save().then((result) => {
   //console.log(blogItem)
//})



app.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

   
  if (!request.body.title || ! request.body.url){
    return response.status(400).end()
  }

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