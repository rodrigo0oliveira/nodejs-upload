const BaseError = require('../BaseError.js');

class AuthenticationError extends BaseError{
    constructor(message,status = 401){
        super(message,status);
    }
}

module.exports = AuthenticationError;