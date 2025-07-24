const express = require('express');
const { uploadImage,fetchImages } = require('../controllers/image.controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const multerMiddleware = require('../middleware/upload-middleware')

const router = express.Router();

router.post('/',authMiddleware,adminMiddleware,multerMiddleware.single('image'),uploadImage);//upload image - only admin

router.get('/',authMiddleware,fetchImages); //get images - need auth

module.exports = router;

