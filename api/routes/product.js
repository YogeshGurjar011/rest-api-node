const express = require("express");
const router = express.Router();
// const Student = require("../model/student");
const Product = require("../model/product")
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");


const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
    destination: "./api/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});


const upload = multer({
    storage: storage
})

// all data get in database
router.get('/get', checkAuth, (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                Product: result
            })
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({
                message: "cannot find data",
                error: error
            })
        })
});

// get data by ID
router.get('/getBy/:id', (req, res, next) => {
    console.log(req.params.id);
    const _id = req.params.id;
    Product.findById(_id)
        .then(result => {
            res.status(200).json({
                product: result
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "cannot find product",
                error: error
            })
        })
})

//Post data send 
router.post('/post', upload.single('imagePath'), (req, res, next) => {
    console.log(req.body);
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        code: req.body.code,
        title: req.body.title,
        description: req.body.description,
        mrp: req.body.mrp,
        sp: req.body.sp,
        discountPercent: req.body.discountPercent,
        imagePath: req.file.filename
    })
    product.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Product Add Successfully",
                new_product: result,
                url:`http://localhost:3000/product/post/${req.file.filename}`
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
})


// delete request
router.delete('/delete/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "product deleted Successfully",
                result: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: " product cannot deleted",
                error: error
            })
        })
})


// Update Product request put is request to send all data to send the body
router.put('/update/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, {
        $set: {
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            mrp: req.body.mrp,
            sp: req.body.sp,
            discountPercent: req.body.discountPercent,
            imagePath: req.body.imagePath
        }
    })
        .then(result => {
            res.status(200).json({
                message: "Product Updated Successfully",
                updated_product: result
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "product not updated",
                error: error
            })
        })
})


module.exports = router;