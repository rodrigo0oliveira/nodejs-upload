const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username: {
        type:String,
        required:[true,"Username field is required!"],
        trim:true
    },
    email:{
        type:String,
        required:["E-mail is required"],
        unique: [true,'E-mail already exists'],
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password is required!"]
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default : 'user'
    }

},{timestamps:true})

module.exports = mongoose.model('User',userSchema);