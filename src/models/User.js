const mongoose = require('mongoose');
const emailValidator = require('../validators/emailValidator.js');

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
        lowercase:true,
        validate: {
            validator: emailValidator,
            message: "Invalid e-mail"
        }
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
        minLength: [8,"The password need have 8 or more chracteres"]
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default : 'user'
    }

},{timestamps:true})

module.exports = mongoose.model('User',userSchema);