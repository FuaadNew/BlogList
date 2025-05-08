const jwt = require('jsonwebtoken')
const tokenExtractor = (request,response,next) =>{
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ', '')
    }
    else{
        request.token = null
    }
    
    next()

}


const userExtractor = async (request, response,next) =>{

    if (!request.token){
        request.user = null
        return next()
    }
    const user = request.user
    response.user = user

    const decodedToken = jwt.verify(request.token, process.env.secret)
}

module.exports = {
    tokenExtractor
}
