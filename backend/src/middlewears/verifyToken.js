const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken')
const config = require('../../src/config')

module.exports = function(req,res,next){
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){
        res.status(401).send('Token not provided')
    }
    try{
        const decoded = jwt.verify(token,config.JWT_TOKEN_KEY)
        req.user = decoded

    }catch(error){
        res.status(400).send('Invalid token')

    }
    return next()


}