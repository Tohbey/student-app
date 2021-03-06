const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const {Courses} = require('../models/course')
const monogoose = require('mongoose')
const chalk = require('chalk')
const authorization = require('../middleware/auth')
const student = require('../middleware/student')
const admin = require('../middleware/admin')


router.get('',[authorization,student],async (req,res) => {
    const students = await Student.find().sort('name')
    res.status(200).json(students)
})

router.get('/:id',[authorization,student],async (req,res) => {
    const id = req.params.id
    
    const isValid = monogoose.Types.ObjectId.isValid(id)
    if(!isValid) return res.status(400).send('Inavlid student id')
    
    const student = await Student.findById(id)
    console.log(student)

    if(!student) return res.status(400).send('Ivalid student id -- student not found')
 
    console.log(chalk.green('student found'))   
    res.send(student)
})

router.post('',[authorization,student],async (req,res) => {
    const course = await Course.findById(req.body.courseId)
    if(!course) return res.status(400).send('Invalid course')

    let student = new Student({
        surname:req.body.surname,
        othernames:req.body.othernames,
        department:req.body.department,
        faculty:req.body.faculty,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        level:req.body.level,
        course:{
            courseCode: course.courseCode,
            courseTitle: course.courseTitle,
            courseUnit: course.courseUnit,
        }
    })
    try{
        student = await student.save()
        res.send(student);
        console.log(chalk.green('Student saved'))
    }catch(err){
        for(field in err.errors)
            console.log(chalk.red(err.errors[field]))
            res.status(400).send(err.errors[field].message)
    }
})

router.put('/:id',[authorization,student],async (req,res) => {
    const id = req.params.id
    const student = await Student.findById(id);
    if(!student) return res.status(400).send('The student with the given ID was not found')

    const course = await Courses.findById(req.body.courseId)
    if(!course) return res.status(400).send('Invalide genre. ');

    student.set({
        surname:req.body.surname,
        othernames:req.body.othernames,
        department:req.body.department,
        faculty:req.body.faculty,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        level:req.body.level,
        course:{
            courseCode: course.courseCode,
            courseTitle: course.courseTitle,
            courseUnit: course.courseUnit,
        }
    })

    try{
        student = await student.save()
        res.send(student)
        console.log(chalk.green('Student updated'))
    }catch(err){
        console.log(chalk.red(err.errors))
        res.status(400).send(err.errors)
    }

})

router.delete('/:id',[authorization,admin],async (req,res) => {
    const student = await Student.findByIdAndRemove(req.params.id)

    if(!student) return res.status(400).send('Student with the givien ID was not found')

    res.status(200).send('Done')
})


module.exports = router;