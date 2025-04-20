const mongoose = require('mongoose')

require('dotenv').config()

console.log(process.env.MONGO_URI)

console.log('Starting the application...')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})


blogSchema.set('toJSON',{
  transform:(document,returnedDocument)=>{
    returnedDocument.id = document._id.toString()
    delete returnedDocument._id
    delete returnedDocument.__v

  }
})
const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl)



module.exports = {Blog}