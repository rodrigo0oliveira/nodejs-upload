class BaseError extends Error{

    constructor(message="Intern server error",status = 500){
        super();
        this.message = message;
        this.status = status;
    }

    sendResponse(res){
        res.status(this.status).send({
            message:this.message
        });
    }
}

module.exports = BaseError;