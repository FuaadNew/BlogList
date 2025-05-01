const BlogsRouter = require('express').Router()
const Blog = require('../models/mongo')
const User = require('../models/users')

BlogsRouter.post('/',async(request,response) => {
    const body = request.body

    const user = await User.findById(body.userId)

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


