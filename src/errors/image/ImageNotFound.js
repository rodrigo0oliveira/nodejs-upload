const BaseError = require("../BaseError");

class ImageNotFound extends BaseError{
    constructor(message = "User not found",status =  404){
        super(message,status);
    }
}

module.exports = ImageNotFound;