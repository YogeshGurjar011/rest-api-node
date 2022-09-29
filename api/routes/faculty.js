const express = require("express");
const router = express.Router();

router.get('/get',(req,res,next)=>{
    res.status(200).json({
        message:"this is faculty get request"
    })
})

router.post('/post',(req,res,next)=>{
    res.status(200).json({
        message:"this is faculty post request"
    })
})


module.exports = router;