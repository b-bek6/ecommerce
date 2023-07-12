const mongoose = require("mongoose");
const { SELLER, BUYER } = require("../constants/role");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Products structure define
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  description:{
    type: String,
  },
  images:{
    type:[String] // store path or our images
  },
  categories:{
    type: [String],
  },
  brands:{
    type: [String],
  },
  /*
    {
        name: "product-1",
        price:100,
        created_by: {
            name:"ram",
            email:"r@r.com"
        }
    }
    reference document
  */
  created_by: {
    type: ObjectId, // just like sql, this is reference to the id of users table/ collection
    required: true,
    ref: "User"
  }
});
module.exports = mongoose.model("Product", ProductSchema);