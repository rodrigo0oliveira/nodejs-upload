const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserTest
 *   description: Users endpoints
 */


/**
 * @swagger
 * /api/user/:
 *   get:
 *    summary: User Test
 *    tags: [UserTest]
 *    responses:
 *      201:
 *        description: Successful response - User is authenticaded and have user or admin role.
 *      401:
 *         description: Not Authorized - User are not authenticated or is not admin or user!
 *      500:
 *          description: Internal Server Error!
 */
router.get('/',authMiddleware,(req,res)=>{
    res.json({
        message:'User route'
    })
})

module.exports = router;