const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength:3 , unique:true},
    name: String,
    passwordHash: {type: String, required: true, minlength:3},
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'

        }
    ]
})


userSchema.set('toJSON',{
    transform:(document,returnedDocument)=>{
      returnedDocument.id = document._id.toString()
      delete returnedDocument._id
      delete returnedDocument.__v

      delete returnedDocument.passwordHash

  
    }
  })

  const User = mongoose.model('User',userSchema)

  module.exports = User