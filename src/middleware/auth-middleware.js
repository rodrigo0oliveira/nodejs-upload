const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/authentication/AuthenticationError');

const authMiddleware = (req,res,next) =>{
    try{
        const bearerToken = req.headers['authorization'];

        const token = bearerToken && bearerToken.split(" ")[1];

        if(!token){
            throw new AuthenticationError('Authentication must be provided!');
        }
        const decodedToken = jwt.decode(token,process.env.JWT_SECRET_KEY);

        if(!decodedToken){
            throw new AuthenticationError("Invalid authentication!");
        }

        req.userInfo = decodedToken;

        next();
        
    }catch(error){
        next(error);
    }
}

module.exports = authMiddleware;