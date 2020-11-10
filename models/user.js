const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
    surname:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    othernames:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email:{
        type:String,
        unique:true,
        maxlength:255,
        minlength:10,
        required:true
    },
    password:{
        type:String,
        required:true,
        maxlength:1024,
        minlength:5
    },
    role:{
        type:String,
        enum:['Admin','Student'],
        required:true
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id,email:this.email,surname:this.surname,role:this.role},jwtSecret);
    return token;
}

const User = mongoose.model('User',userSchema);

module.exports = User;