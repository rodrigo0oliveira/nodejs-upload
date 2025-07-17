const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    })

    await newUser.save();

    return newUser;
}


async function encriptPassword(password){

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    return hashedPassword;
} 

async function isPasswordMatch(email,password){
    const user = await User.findOne({email:email});

    return await bcrypt.compare(password,user.password);
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

module.exports = {
    verifyIfEmailExists,
    createUser,
    isPasswordMatch,
    createToken
}