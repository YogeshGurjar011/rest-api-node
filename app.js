const express = require("express");
const app = express();


const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");
const productRoute = require("./api/routes/product");
const userRoute = require("./api/routes/user");

const cors = require("cors")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


mongoose.connect('mongodb+srv://YogeshGurjar:yogesh123@cluster0.zgip5ve.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error', error => {
    console.log("Database Connection Failed")
})

mongoose.connection.on('connected', connected => {
    console.log("Database Connection successfully")
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors());

app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/product', productRoute);
app.use('/user',userRoute);

app.use((req, res, next) => {
    res.status(404).json({
        error: "bad request",
        message:"url not found"
    })
})



module.exports = app;