const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');


const router = express.Router();

router.get('/',authMiddleware,(req,res)=>{
    res.json({
        message:'User route'
    })
})

module.exports = router;