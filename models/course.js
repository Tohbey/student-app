const moongoes = require('mongoose')
const Joi = require('joi')

const courseSchema = new moongoes.Schema({
    courseCode:{
        type: String,
        required: true,
        maxlength: 7 
    },
    courseTitle:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    courseUnit:{
        type: Number,
        required: true,
        min:0,
        max:6
    }
})
const Course = moongoes.model('Course', courseSchema);

exports.Courses = Course;
exports.courseSchema = courseSchema;
