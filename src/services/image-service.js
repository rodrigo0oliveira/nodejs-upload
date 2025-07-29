const Image = require('../models/Image');

const uploadImageService = async (url,publicId,uploadedBy) =>{
    
    const newImage = new Image({
        url,
        publicId,
        uploadedBy
    });

    const image = await newImage.save();

    return image;
}

const fetchImagesService = async()=>{
    const images = await Image.find({});

    return images;
}

const deleteImageService = async(publicId)=>{
    const {deletedCount} = await Image.deleteOne({publicId:publicId});

    if(!deletedCount){
        throw new Error("Image not found with id: "+publicId);
    }

    return "Imagem deletada com sucesso!";
}

module.exports = {
    uploadImageService,
    fetchImagesService,
    deleteImageService
}