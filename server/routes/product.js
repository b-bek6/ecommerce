const express = require("express");
const { fetchProducts, storeProducts, updateProducts, removeProducts } = require("../controller/product");
const {checkAuthentication, isSeller} = require('../middleware/checkAuthentication');
const router = express.Router();


router.get("/", fetchProducts);
router.post("/", checkAuthentication, isSeller, storeProducts);
router.put("/:id", checkAuthentication, isSeller, updateProducts);
router.delete("/:id", checkAuthentication, isSeller, removeProducts);

module.exports = router