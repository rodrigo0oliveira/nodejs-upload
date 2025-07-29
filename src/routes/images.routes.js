const express = require('express');
const { uploadImage,fetchImages,deleteImage } = require('../controllers/image.controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const multerMiddleware = require('../middleware/upload-middleware')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Images Endpoints
 */


/**
 * @swagger
 * /api/images:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Upload Image.
 *     tags: [Images]
 *     responses:
 *       201:
 *         description: Successful response - Your image was upload successfuly!
 *       401:
 *         description: Not Authorized - User are not authenticated or is not admin!
 *       500:
 *         description: Internal Server Error!
 *     requestBody:
 *       content:
 *          image/png:
 *              schema:
 *                  type: string
 *                  format: binary
 *            
 */
router.post('/',authMiddleware,adminMiddleware,multerMiddleware.single('image'),uploadImage);//upload image - only admin

/**
 * @swagger
 * /api/images:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Fetch Images.
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Successful response - Fetch images was done!
 *       204:
 *         description: Succesful response - Fetch image was done but no one image was found!
 *       401:
 *         description: Not Authorized - User are not authenticated!
 *       500:
 *         description: Internal Server Error!
 *            
 */
router.get('/',authMiddleware,fetchImages); //get images - need auth

/**
 * @swagger
 * /api/images:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete Image.
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageId
 *             properties:
 *               imageId:
 *                 type: number
 *     responses:
 *       204:
 *         description: No content response - Image deleted!
 *       401:
 *         description: Not Authorized - User are not authenticated or is not admin!
 *       500:
 *         description: Internal Server Error!
 */
router.delete('/',authMiddleware,adminMiddleware,deleteImage);

module.exports = router;

