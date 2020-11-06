const mongoose = require('mongoose')
const {courseSchema} = require('./course')

const Student = mongoose.model('Student', new mongoose.Schema({
    surname:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    othernames:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    department:{
        type:String,
        required:true,
        minlength:11,
        maxlength:80
    },
    faculty:{
        type:String,
        required:true,
        minlength:8,
        maxlength:80
    },
    phoneNumber:{
        type:Number,
        required:true,
        minlength:8,
        maxlength:11
    },
    email:{
        type:String,
        required:true,
    },
    level:{
        type:String,
        required:true,
    },
    programme:{
        type:String,
    },
    courses:[courseSchema]
}))

module.exports = Student;
