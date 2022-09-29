const express = require("express");
const router = express.Router();
const Student = require("../model/student");
const mongoose = require("mongoose");


// all data get in database
router.get('/get', (req, res, next) => {
    Student.find()
        .then(result => {
            res.status(200).json({
                studentData: result
            });
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({
                message: "cannot find data",
                error: error
            })
        })
})

// get data by ID
router.get('/getBy/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            error:error
        })
    })
})

//Post data send 
router.post('/post', (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender
    })
    student.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Student Added Succeffully",
                newStudent: result
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
})


module.exports = router;