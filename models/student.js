const mongoose = require('mongoose')
const {courseSchema} = require('./course')
const Joi = require('joi')
// Joi.ObjecyId = require('joi-objectid')(Joi)

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

function validateStudent(student) {
    const schema = {
        surname: Joi.string().min(5).max(100).required(),
        othernames: Joi.string().min(5).max(100).required(),
        department: Joi.string().min(11).max(100).required(),
        faculty: Joi.string().min(8).max(80).required(),
        phoneNumber: Joi.Number().min(5).max(11).required(),
        email: Joi.string().required(),
        level: Joi.string().required(),
        programme: Joi.string(),
    }
}
exports.Student = Student;
exports.validate = validateStudent