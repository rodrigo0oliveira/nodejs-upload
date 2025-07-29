const authService = require('../services/auth-service');


//register controller
const register = async (req,res) =>{
    try {
        const {username,email,password,role} = req.body;

        if(await authService.verifyIfEmailExists(email)){
            return res.status(400).json({
                success:false,
                message:'Email already exists,try with another email adress'
            })
        }

        const userCreated = await authService.createUser(username,password,email,role);

        if(userCreated){
            res.status(201).json({
                success:true,
                message:'User created with success'
            })
        }else{
            res.status(400).json({
                success:true,
                message:'User can not be created!'
            })
        }
          
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error: error.message
        })
    }
}


//login controller
const login = async (req,res) =>{
    try {
        const {email,password} = req.body;

        const emailExists = await authService.verifyIfEmailExists(email);
        const matchPassword = await authService.isPasswordMatch(email,password);

        if(!emailExists || !matchPassword){
            res.staus(400).json({
                success:false,
                message:`Invalid e-mail or password!`
            });
        }

        const token = await authService.createToken(email);

        res.status(200).json({
            success:true,
            message:'Logged in successful!',
            acessToken:token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const updatePassword = async(req,res)=>{
    try {
        const userId = req.userInfo.userId;

        const {newPassword} = req.body;

        const message = await authService.updatePassword(newPassword,userId);

        res.status(200).send({
            success:true,
            message:message
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    register,
    login,
    updatePassword
}