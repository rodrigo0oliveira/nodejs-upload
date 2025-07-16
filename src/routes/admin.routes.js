const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AdminTest
 *   description: Admin endpoints
 */


/**
 * @swagger
 * /api/admin/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Test admin endpoint.
 *     tags: [AdminTest]
 *     responses:
 *       200:
 *         description: Successful response - User are authenticated and is admin!
 *       401:
 *         description: Not Authorized - User are not authenticated or is not admin!
 *       500:
 *         description: Internal Server Error!
 */
router.get('/',authMiddleware,adminMiddleware,(req,res)=>{
    res.send({
        message:'Admin route'
    })
})


module.exports = router;