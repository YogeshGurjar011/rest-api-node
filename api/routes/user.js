const express = require("express");
const router = express.Router();
const User = require("../model/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get('/get', (req, res, next) => {
    User.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            Users : result
        })
    })
});


// User Singup User And User Created
router.post('/singUp', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: "password is not bcrypt",
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                phone: req.body.phone,
                userType: req.body.userType
            })
            user.save()
                .then(result => {
                    // console.log(result);
                    res.status(201).json({
                        message: "user Created Succeffully",
                        new_user: result
                    })
                })
                .catch(error => {
                    console.log(error)
                    res.status(500).json({
                        error: error
                    })
                })
        }
    })
})


// User SingIn User  
router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "User Not exist"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        message: "password does not match"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        userType: user[0].userType,
                        email: user[0].email,
                        phone: user[0].phone
                    }, 'thisisdummytext', { expiresIn: "365d" });
                    res.status(200).json({
                        message: "User Login Successfully",
                        username: user[0].username,
                        userType: user[0].userType,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: token
                    })
                }
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
})






module.exports = router;