const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url:{
        type:String,
        required:[true,"Image url is necessary!"]
    },
    publicId:{
        type:String,
        required:[true,"publicId image url is necessary!"]
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"uploadedBy is necessary!"]
    }
},{timestamps:true})

module.exports = mongoose.model('Image',imageSchema);