const authService = require('../services/auth-service');

const register = async (req,res,next) =>{
    try {
        const {username,email,password,role} = req.body;

        if(await authService.verifyIfEmailExists(email)){
            return res.status(400).json({
                success:false,
                message:'Email already exists,try with another email adress'
            })
        }

        const userCreated = await authService.createUser(username,password,email,role);

        res.status(201).json({
            success:true,
            message:'User created with success',
            user:userCreated
        });
          
    } catch (error) {
        next(error);
    }
}

const login = async (req,res,next) =>{
    try {
        const {email,password} = req.body;

        const emailExists = await authService.verifyIfEmailExists(email);
        const matchPassword = await authService.isPasswordMatch(email,password);

        authService.verifyEmailAndPassword(emailExists,matchPassword);

        const token = await authService.createToken(email);

        res.status(200).json({
            success:true,
            message:'Logged in successful!',
            acessToken:token
        });
        
    } catch (error) {
        next(error);
}
}

const updatePassword = async(req,res,next)=>{
    try {
        const userId = req.userInfo.userId;

        const {newPassword} = req.body;

        const message = await authService.updatePassword(newPassword,userId);

        return res.status(200).send({
            success:true,
            message:message
        })

    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    updatePassword
}
