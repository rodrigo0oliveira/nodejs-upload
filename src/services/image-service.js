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

module.exports = {
    uploadImageService,
    fetchImagesService
}