const User = require('../models/User');

async function isPasswordMatch(email,password){
    const user = await User.findOne({email:email});

    if(!user){
        throw new Error(`User not find User: {user}`);
    }

    return await bcrypt.compare(password,user.password);
};

module.exports = {
    isPasswordMatch
}