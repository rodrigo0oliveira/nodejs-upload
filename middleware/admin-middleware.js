
const adminMiddleware = (req,res,next) => {

    const userInfo = req.userInfo;
    console.log(userInfo.role)

    if(userInfo.role != 'admin'){
        return res.status(404).json({
            success:false,
            message:"Acess denied, you need a admin acess!"
        })
    }

    next();
}

module.exports = adminMiddleware;