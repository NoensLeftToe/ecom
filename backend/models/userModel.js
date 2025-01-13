const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "pls enter your name"],
        maxLength:[30, "cannot exceed 30 character"],
        minLength:[4, "name should have more than 4 characters"]
    },
    email:{
        type:String,
        require:[true,"Please enter your email"]
    }

})