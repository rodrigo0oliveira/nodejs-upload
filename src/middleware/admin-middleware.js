const AuthenticationError = require("../errors/authentication/AuthenticationError");
const logError = require("../helpers/utils/erros");

const adminMiddleware = (req,res,next) => {
    try {
        const userInfo = req.userInfo;

        if(userInfo.role != 'admin'){
            throw new AuthenticationError("Acess denied, you need a admin acess!");
        }

        next();
    } catch (error) {
        next(error);
    }

    
}

module.exports = adminMiddleware;