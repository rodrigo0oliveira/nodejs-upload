const BaseError = require("./BaseError");

class BadRequest extends BaseError{

    constructor(message,status = 400){
        super(message,status);
    }

}

module.exports = BadRequest;