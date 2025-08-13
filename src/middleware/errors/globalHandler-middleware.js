
const { Error } = require('mongoose');
const AuthenticationError = require('../../errors/authentication/AuthenticationError.js');
const BadRequest = require('../../errors/BadRequest.js');
const BaseError = require('../../errors/BaseError.js');
const UserNotFound = require('../../errors/user/UserNotFound.js');
const { logError } = require('../../helpers/utils/erros.js');


const globalHandlerMiddleware = (err,req,res,next) => {
    
    logError(err.message);
    
    if(err instanceof AuthenticationError){
        new AuthenticationError(err.message).sendResponse(res);
    }else if(err instanceof BadRequest){
        new BadRequest(err.message).sendResponse(res);
    }
    else if(err instanceof UserNotFound){
        new UserNotFound(err.message).sendResponse(res);
    }
    else if(err instanceof Error.ValidationError){
        new BadRequest(err.message).sendResponse(res);
    }
    else{
        new BaseError().sendResponse(res);
    }

    next();
}

module.exports = globalHandlerMiddleware;