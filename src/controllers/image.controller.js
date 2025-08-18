const { uploadCloudinary } = require('../helpers/cloudinaryHelper.js');
const { uploadImageService,fetchImagesService,deleteImageService } = require('../services/image-service.js');
const fs = require('fs');

const uploadImage = async(req,res,next) =>{
    try{

        const file = req.file;

        if(!file){
            res.status(400).send({
                success:false,
                message:"File is required!"
            })
        }

        const {url,publicId} = await uploadCloudinary(req.file.path);

        const resultImage = await uploadImageService(url,publicId,req.userInfo.userId);

        res.status(202).send({
            success:true,
            message:"Message uploaded!",
            image:resultImage
        })

        fs.unlinkSync(path.file.path);

    }catch(error){
        next(error);
    }
}

const fetchImages = async(req,res,next)=>{
    try{
        fetchImagesService(req,next);
    }
    catch(error){;
        next(error);
    }
    
}

const deleteImage = async (req,res,next)=>{
    try{

        const {publicId} = req.body;

        await deleteImageService(publicId);

        res.status(204).send();


    }catch(error){
        next(error);
    }
}

module.exports = {
    uploadImage,
    fetchImages,
    deleteImage
}