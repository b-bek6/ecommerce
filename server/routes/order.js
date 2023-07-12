const express = require("express");
const Joi = require('joi')
const { store } = require("../controller/order");
const validateSchema = require("../middleware/validateSchema");
const { isBuyer, checkAuthentication } = require("../middleware/checkAuthentication");
const router = express.Router();



router.post("/", checkAuthentication ,isBuyer, store);

module.exports = router;