const mockAuthMiddleware = (req,res,next) =>{
    const idUserMock = 33;
    req.userInfo =  {userId: idUserMock};

    next();
};

module.exports = mockAuthMiddleware;