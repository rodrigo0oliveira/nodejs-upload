const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) =>{

    const bearerToken = req.headers['authorization'];

    const token = bearerToken && bearerToken.split(" ")[1];

    if(!token){
        return res.status(404).json({
            sucess:false,
            message: 'Authentication must be provided!'
        })
    }

    try{
        const decodedToken = jwt.decode(token,process.env.JWT_SECRET_KEY);

        if(!decodedToken){
            return res.status(404).json({
                success:false,
                message: "Invalid authentication!"
            })
        }

        req.userInfo = decodedToken;

        next();


    }catch(error){
        console.log(error);
    }
}

module.exports = authMiddleware;