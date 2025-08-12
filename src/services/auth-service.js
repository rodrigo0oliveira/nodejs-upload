const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { isPasswordMatch,encriptPassword } = require('../helpers/utils/passwordUtils');
const AuthenticationError = require('../errors/authentication/AuthenticationError');
const BadRequest = require('../errors/BadRequest.js');
const UserNotFound = require('../errors/user/UserNotFound.js');

async function verifyIfEmailExists(email) {
    const user = await User.findOne({email:email})
    if(user){
        return true;
    }
    return false;
}

async function createUser(username,password,email,role) {
    const hashedPassword = await encriptPassword(password);

    const newUser = new User({
        username:username,
        email:email,
        password:hashedPassword,
        role:role
    });

    const user = await newUser.save();

    if(!user){
        throw new Error("User not created,please try again");
    }

    return user;
}

async function createToken(email){
    const user = await User.findOne({email:email});

    const accessToken = jwt.sign({
        userId: user._id,
        username:user.username,
        role:user.role
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:'15m'
    })

    return accessToken;
}

const updatePassword = async(newPassowrd,userId)=>{
    const user = await User.findOne({_id:userId});
    
    if(user){

        if(await isPasswordMatch(user.email,newPassowrd)){
            throw new BadRequest("The password cannot be equals to old password");
        }

        const newEncriptPassword = await encriptPassword(newPassowrd);
        user.password = newEncriptPassword;

        await user.save();

        return "Password updated successfuly!";
    }

    throw new UserNotFound();
}

const verifyEmailAndPassword = (email,password) => {
    if(!email || !password){
        throw new AuthenticationError("Email or password invalid");
    }
}

module.exports = {
    verifyIfEmailExists,
    createUser,
    isPasswordMatch,
    createToken,
    updatePassword,
    verifyEmailAndPassword
}