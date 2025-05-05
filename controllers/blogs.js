const BlogsRouter = require('express').Router()
const Blog = require('../models/mongo')
const User = require('../models/users')

const jwt = require('jsonwebtoken')

const getTokenFrom = request =>{
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ') ){
        return authorization.replace('Bearer ', '')
    }
    return null
}

BlogsRouter.post('/',async(request,response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request),process.env.secret)
    if (!decodedToken.id){
        return response.status(401).json({error: 'token Invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const Blog = new Blog({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
        user:user._id
       
        
    })

    const savedBlog = await Blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(200).json(savedBlog)
})



usersRouter.get('/',async(request,response)=>{
    const blogs = await Blog.find({}).populate('user', {username:1,name:1})
    response.json(blogs)
    

})


