const Order = require("../model/Order");
const Product = require("../model/Product");

const store = async (req, res, next) => {
    // console.log("this is order route");

    // req.body.products = [    ]
    // in db we need [name, quantity, price, created_by, status] 

    let request_products = req.body.products;
    console.log(req.body.products)
    let products = []
    for (let index = 0; index < request_products.length; index++) {
        let product = await Product.findById(request_products[index].product_id)
            products.push({
                name: product.name,
                quantity: request_products[index].quantity,
                price: product.price,
                status: "Pending",
                product_id : product._id
            })
    }
    let order = await Order.create({
        products,
        created_by: req.user._id
    });
    res.send(order);
}


module.exports = {
    store
}