const cloudinary = require('../config/cloudinary.js');

const uploadCloudinary = async (filePath) => {
    try{
        const result = await cloudinary.uploader.upload(filePath);

        return {
            url:result.secure_url,
            publicId: result.public_id
        };

    }catch(error){
        console.error('Error while uploading cloudinary :',error);
    }
}

module.exports = {
    uploadCloudinary
}