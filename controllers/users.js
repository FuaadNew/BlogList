const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users.js')

usersRouter.post('/',async(request,response)=>{
const {username, name, password} = request.body

if (!password || password.length < 3) {
    response.status(400).json({"error":"password must be atleast 3 characters long"}).end()
    return
}

if (!username || username.length < 3) {
    response.status(400).json({"error":"username must be atleast 3 characters long"}).end()
    return
}

const saltRounds = 10

const passwordHash = await bcrypt.hash(password,saltRounds)

const user = new User({
    username:
    name,
    passwordHash
})
const savedUser = await user.save()
response.status(201).json(savedUser)

}

)

usersRouter.get('/',async(request,response)=>{
    const users = await User.find({}).populate('blogs')
    response.json(users)
    

})


module.exports = usersRouter