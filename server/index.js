const express = require("express");
const fileUpload = require('express-fileupload');
require('./config/database'); // link file of database
require('dotenv').config();
const app = express();

const auth_route = require('./routes/auth');
const product_route = require('./routes/product');
const order_route = require("./routes/order");
app.use(express.static('uploads')); // directly accessable
// middleware

app.use(express.json()); // global middleware // we get value in req.body
app.use(fileUpload()); // for img // we can read data sent from form

app.use((req, res, next) => {

    function changeRequest(field) {


        if (req[field]) {
            let temp = {};
            let temp_arr = Object.entries(req[field])

            temp_arr.forEach(el => {
                if (el[0].endsWith("[]")) {
                    temp[el[0].slice(0, -2)] = Array.isArray(el[1]) ? el[1] : [el[1]]
                } else {
                    temp[el[0]] = el[1]
                }
            })
            req[field] = temp
    }


    }

    changeRequest("body")
    changeRequest("files")

    next()

})
app.use("/api", auth_route);
app.use("/api/products", product_route);
app.use("/api/orders", order_route);


// exception / error handeling
app.use((req, res)=>{
    res.status(404).send({msg: "Resource Not found"})
})
app.use((err, req, res, next) => {
    let status = 500;
    let msg = "Server Error";
    let errors = null;
    console.log(err.name);

    if(err.name=="ValidationError") {
        status = 400;
        msg = "Bad Request"

        let errors_arr = Object.entries(err.errors);
        // console.log(errors_arr);
        let temp = [];

        errors_arr.forEach(el => {
            let obj = {}
            obj.params = el[0];
            obj.msg = el[1].message;
            temp.push(obj)
        })
        errors = temp;
    }
    res.status(status).send({msg: msg, errors, error: err});
})
app.listen(8000, ()=>{
    console.log("Server Started");
})