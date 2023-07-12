const express = require("express");
const Joi = require('joi')
const { signup, login } = require("../controller/auth");
const validateSchema = require("../middleware/validateSchema");
const router = express.Router();

// joi validation for db validation
const signupSchema = Joi.object({
    name: Joi.string()
        .max(255)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    role: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required(),
})


router.post("/signup", validateSchema(signupSchema), signup);
router.post("/login", validateSchema(loginSchema), login);

module.exports = router;