const { uploadCloudinary } = require('../config/cloudinary.js');
const { uploadImageService } = require('../services/image-service.js');

const uploadImage = async(req,res) =>{
    try{

        const file = req.file;

        if(!file){
            res.status(400).send({
                success:false,
                message:"File is required!"
            })
        }

        const {url,publicId} = await uploadCloudinary(req.file.path);

        const resultImage = uploadImageService(url,publicId,req.userInfo.userId);

        res.status(202).send({
            success:true,
            message:"Message uploaded!",
            image:resultImage
        })

    }catch(error){
        console.error(error);
        res.status(500).send(
            {message:error}
        );
    }
}

module.exports = {
    uploadImage
}