const BaseError = require("../BaseError");

class UserNotFound extends BaseError{
    constructor(message = "User not found",status =  404){
        super(message,status);
    }
}

module.exports = UserNotFound;