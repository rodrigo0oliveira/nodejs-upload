const { uploadCloudinary } = require('../helpers/cloudinaryHelper.js');
const { uploadImageService,fetchImagesService } = require('../services/image-service.js');
const fs = require('fs');

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

        const resultImage = await uploadImageService(url,publicId,req.userInfo.userId);

        res.status(202).send({
            success:true,
            message:"Message uploaded!",
            image:resultImage
        })

        //delete from local
        fs.unlinkSync(path.file.path);

    }catch(error){
        console.error(error);
        res.status(500).send(
            {message:error}
        );
    }
}

const fetchImages = async(req,res)=>{
    try{
        const images = await fetchImagesService();

        if(!images){
        res.status(204).send({
            success:true,
            message:"No one image was found!"
            })
            return;
        }

        res.status(200).send({
        success:true,
        data:images
        });
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"Error was found, please try again!"
        })
    }
    
}

module.exports = {
    uploadImage,
    fetchImages
}