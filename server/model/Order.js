const mongoose = require("mongoose");
const { SELLER, BUYER } = require("../constants/role");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/* 
    {
        products: [
            {name: watch, quantity:10, price:1000, status:pending}
            {name: mouse, quantity:10, price:1000, status:shipped}
            {name: monitor, quantity:10, price:2000, status:reject}
        ]
        created_by
    }
*/
// embedded document vs reference documents 
const OrderSchema = new Schema({
    products:[
        {
            name: {
                type: String,
                required: true,
            },
            quantity:{
                type: Number,
                min: 0
            },
            price: {
                type: Number,
                min:0,
                required: true
            },
            status: {
                type: String,
                enum:["Pending","Shipped","Rejected"],
                default:"Pending"
            },
            product_id:{
                type: ObjectId,
                ref:"Product",
                required: true
            },
        }
    ],
    created_by:{
        type: ObjectId,
        ref:"User",
        required:true
    }

});

module.exports = mongoose.model("Order", OrderSchema);