const jwt = require('jsonwebtoken')
const User = require('./models/users')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }
    
    next()
}

const userExtractor = async (request, response, next) => {
    if (!request.token) {
        request.user = null
        return next()
    }

    const decodedToken = jwt.verify(request.token, process.env.secret)

    if (!decodedToken) {
        request.user = null
        return next()
    }
    
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor,
    getTokenFrom
}
