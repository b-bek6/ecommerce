const mongoose = require("mongoose");
const { SELLER, BUYER } = require("../constants/role");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// user structure define
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  email:{
    type: String,
    required: true,
    // unique: true, unique ta hunxa but error validation error vanera aaudaina so we use costum validation
    // custom validator
    validate:{
        // validator vitra arrow function chaldaina
        validator: async function(value){
            // console.log(value);
            let exists = await mongoose.models.User.findOne({email:value})
            if(exists){
                return false
            }
            // return true
        },
        message: "Email already exist"
    }
  },
  role: {
    type: String,
    enum: [SELLER , BUYER],// drop down
    set: function (value){
        return value.toLowerCase();
    }
  },
  password:{
    type: String,
    required: true,
    // select: false
  },
  balance:{
    type: Number,
    default: 0,
    min: 0
  }

});

module.exports = mongoose.model("User", UserSchema);