const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require("../model/User");
const jwt = require('jsonwebtoken');


// signup validator, response and store in database 
const signup = async (req, res, next) => {
    try {

        let hash_pass = await bcrypt.hash(req.body.password, 10);
        let user = await User.create({...req.body, password: hash_pass}); // store in database
        res.send(user); // sends response
    } catch (err) {
        next(err);  // next error handeling
    }
    //fetch data from request
    // validation
    // store in database
}

// login validator

//login
const login = async (req, res) => {
    /* check if valid use email */
    /* check if valid password */

/* if select: false in password field of userModel
    let product = await User.ffindById(_id).select("password");
    return res.send(product)
*/



    let user = await User.findOne({email: req.body.email})

    if(user){
        let status = await bcrypt.compare(req.body.password, user.password);
        if(status){
            let obj = {...user.toObject()}
            delete obj.password;
            let token = jwt.sign(obj, process.env.JWT_SECRET);
            return res.send({data:obj, token});
        }
    }
    return res.status(401).send({msg: "Invalid Email or Password"})
}

module.exports = {
    login,
    signup
}