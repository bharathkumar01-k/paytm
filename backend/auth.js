const jwt = require('jsonwebtoken');
const config = require('./config')

const userAuthentication = (req,res,next) => {
    const authorization = req.headers?.authorization
    console.log(typeof(authorization))
    if(!authorization || !authorization.startsWith('Bearer')){
        return res.status(403).json({
            success:false
        })
    }
    const authToken = authorization.split(' ')[1]
    try{
        const userId = jwt.verify(authToken,config.JWT_SECRET)
        req.userId = userId
    }
    catch(e){
        return res.status(403).json({
            success:false,
            error:e
        })
    }
    next()
}
exports.userAuthentication = userAuthentication