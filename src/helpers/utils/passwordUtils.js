const User = require('../../models/User');
const bcrypt = require('bcryptjs');

async function isPasswordMatch(email,password){
    const user = await User.findOne({email:email});

    if(!user){
        throw new Error(`User not find User: {user}`);
    }

    return await bcrypt.compare(password,user.password);
};

async function encriptPassword(password){

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    return hashedPassword;
}

module.exports = {
    isPasswordMatch,
    encriptPassword
}