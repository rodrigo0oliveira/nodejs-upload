const express = require('express');
const { register, login,updatePassword } = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register/:
 *   post:
 *     summary: Register account.
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response - User created.
 *       400:
 *         description: Email already exists!
 *       500:
 *         description: Internal Server Error!
 */
router.post('/register',register);

/**
 * @swagger
 * /api/auth/login/:
 *   post:
 *     summary: Login Authentication.
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response - Credentials are valid and a token is returned!
 *       400:
 *         description: Credentials Invalid - Email or password is incorrect!
 *       500:
 *         description: Internal Server Error!
 */
router.post('/login', login);


router.put('/updatePassword',authMiddleware,updatePassword);

module.exports = router;