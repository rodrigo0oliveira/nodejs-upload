const express = require('express');
const { uploadImage } = require('../controllers/image.controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

const router = express.Router();

router.post('/',authMiddleware,adminMiddleware,uploadImage);//upload image - only admin

router.get('/',authMiddleware,); //get images - need auth

