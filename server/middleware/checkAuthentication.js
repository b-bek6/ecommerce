
const jwt = require("jsonwebtoken");
const { SELLER, BUYER } = require("../constants/role");

const checkAuthentication = (req, res, next) => {
    if(req.headers.authorization){
        let token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if(token){
            try {
                var decoded_user_info = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded_user_info;
                return next()
            } catch (error) {
            }
        }
    }
    res.status(401).send({msg: "unauthenticated"})
}

const isSeller = (req, res, next) => {
    if(req.user.role == SELLER){
        next()
    } else {
        res.status(403).send({msg: "Access denied - only for seler"})
    }
} 
const isBuyer = (req, res, next) => {
    if(req.user.role == BUYER){
        next();
    
    } else {
        res.status(403).send({msg: "Access denied - only for seler"})
    }
    
} 
module.exports = {
    checkAuthentication,
    isBuyer,
    isSeller
}