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

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl)



module.exports = {Blog}