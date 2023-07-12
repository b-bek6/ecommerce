const express = require("express");
const validateSchema = (Schema) => {
    return (req, res, next) =>{
        let {error} = Schema.validate(req.body, {abortEarly: false, stripUnknown: true}); // abortearly, shows error for every , stripUnknow le chai mention gareko field lai matra validate garxa
        if (error){
            /*
                error =[
                    {
                        name : "required"
                    },
                    {
                        email:"invalid email"
                    }
                ]
                error =[
                    {
                        params: "name",
                        "Message": "required"
                    },
                    {
                        email:"invalid email"
                    }
                ]
            */
            let err = error.details.map(validation_error => {
                return {
                    params: validation_error.context.key,
                    message: validation_error.message
                }
            })
            
            res.status(400).send({
                msg: "Bad Request",
                err
            });
    }   else {
            next();
        }
    }
}
module.exports = validateSchema;
