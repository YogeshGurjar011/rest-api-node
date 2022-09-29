const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token,'thisisdummytext')
        console.log(verify)
        if(verify.userType == 'admin'){
            next();
        }
        else{
            return res.status(401).json({
                message : "Only admin can change"
            })
        }
      
    }
    catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
}