const path = require('path');
const Product = require("../model/Product");
const { date } = require('joi');
const fs = require('fs');
const { query } = require('express');
const { search } = require('../routes/auth');

const fetchProducts = async (req, res, next) => {

    // let product = await Product.findById(""); 
    // page 1 show 25 skip 0
    // page 1 show 25 skip 25

    // console.log(req.query);
    let per_page = parseInt(req.query.per_page) || 5;
    let page = parseInt(req.query.page ) || 1;
    let search_term = req.query.search_term || "";
    console.log(req.query.search_term)
    
    let price_from = parseFloat(req.query.price_from) || 0;
    let price_to = parseFloat(req.query.price_to) || 999999999999999; // greater numberß

    // let products = await Product.find(
    //     {$or:[{name:RegExp(search_term,"i")},
    //     {brands:RegExp(search_term,"i")},
    //     {categories:RegExp(search_term,"i")}],
    //     $and: [
    //         { price: {$gte: price_from}} // greater than or equal to
    //     ]
    // }
    // ).skip((page-1)*per_page).limit(per_page) // dbs props
    // res.send({data: products});

    // query operator $or 
    /* sql / relationship -> join
    mongodb -> aggregation
    
    Aggregation (advance find method)
    Aggregation framework
    Aggregation pipeline

    collection of different filters
    */

    let sort_by = req.query.sort_by || {};
    switch (sort_by) {
        case "nameasc":
            sort_by = {name: 1}
            break;
        case "namedesc":
            sort_by = {name: -1}
            break;
        case "priceasc":
            sort_by = {price: 1}
            break;
        case "pricedesc":
            sort_by = {price: -1}
            break;
        default:
            sort_by = { };
            break;
    }
    let totalcount = await Product.aggregate([
        // .find({name:"mouse"})
        {
            $match: {
                $or:[
                    {name:RegExp(search_term,"i")},
                    {brands:RegExp(search_term,"i")},
                    {categories:RegExp(search_term,"i")}
                ]
            }
        }, // search by name 
        {
            $match: {
                $and:
                [
                    {price:{$gte:price_from}},
                    {price:{$lte:price_to}}
                ]
            }
        },
        {
            $sort: sort_by
        },
        {
            // user info of other user by id
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"created_by",
                as:"created_by"
            }
        },
        {
            $unwind:"$created_by"
        },
        {
            // db.user.find({}{name:1, id: -1})
            $project:{
                "created_by.password": 0
            }
        }
    ])
    let products = await Product.aggregate([
        // .find({name:"mouse"})
        {
            $match: {
                $or:[
                    {name:RegExp(search_term,"i")},
                    {brands:RegExp(search_term,"i")},
                    {categories:RegExp(search_term,"i")}
                ]
            }
        }, // search by name 
        {
            $match: {
                $and:
                [
                    {price:{$gte:price_from}},
                    {price:{$lte:price_to}}
                ]
            }
        },
        {
            $sort: sort_by
        },
        {
            // user info of other user by id
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"created_by",
                as:"created_by"
            }
        },
        {
            $unwind:"$created_by"
        },
        {
            // db.user.find({}{name:1, id: -1})
            $project:{
                "created_by.password": 0
            }
        },
        {
            $facet: {
                meta_data:[{$count:"total"},{$addFields:{per_page,page}}],
                products:[{$skip:((page-1)*per_page)},{$limit:per_page}]
            }
        },
        // {
        //     $skip:((page-1)*per_page)
        // },
        // {
        //     $limit:per_page
        // }
    ])
    // total : 38, page: 1, per_page = 25, products : 
    // look up details 
// if not facet
    // res.send({
    //     meta_data:{
    //         total:totalcount.length,
    //         page: page,
    //         per_page
    //     },
    //     products
    // })
    res.send({data:products})
    // res.send({ data: products})
}

const storeProducts = async(req, res, next) => {

    // req.files.images?.forEach(async (img) => {

    //     /* NOTE: we cannot use asyn await inside  a forEach function */
    // })

    for (let i = 0; i < req.files.images?.length; i++) {
        let img = req.files.images[i]
        // let file_name = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(img.name)
        let file_name = img.name;
        try {
            await img.mv(path.join(__dirname, '../', "uploads/") + file_name)
            images.push(file_name)
        } catch (err) {
        }
    }
    try {
        let product = await Product.create({ ...req.body, images: images, created_by: req.user._id })
        res.send(product)
    } catch (err) {
        next(err)
    }
}
const updateProducts = async(req, res, next) => {
    let product_data = await Product.findById(req.params.id);
    let old_images = product_data.images;
    let sent_old_images = req.body.images // 1.png
    let images = [];    // new 
    //  final image [1.png, new.png]
    old_images.forEach(img=>{
        if(sent_old_images?.includes(img)){
            images.push(img);
        } else {
            //delete
            fs.unlinkSync(path.resolve("uploads", img))
        }
    })
    try {
        for (let i =0; i< req.files?.images?.length; i++){
            let img = req.files.images[i]
            // let file_name = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(img.name)
            let file_name = img.name;
        
        try{
            await img.mv(path.join(__dirname, '../', "uploads/") + file_name)
            images.push(file_name)
        }catch(err){

        }
    }
        // check if the product belongs to the same seller
        
        let product = await Product.findByIdAndUpdate(req.params.id, {...req.body, images},{ runValidators:true, new:true});
        res.send(product);
    }   catch (err) {
        next(err);
    }
}

const removeProducts = async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if(product){

        product.images.forEach(img => {
            fs.unlinkSync(path.resolve("uploads", img));
        })
        await Product.findByIdAndDelete(req.params.id);
        return res.status(204).end();
    } else {
        res.status(404).send("Resource not found");
    }
}

module.exports = {
    fetchProducts,
    storeProducts,
    updateProducts,
    removeProducts
}