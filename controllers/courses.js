const express = require('express')
const router = express.Router()
const { Courses} = require('../models/course')
const monogoose = require('mongoose')
const chalk = require('chalk')

router.get('',async (req,res) => {
    const courses = await Courses.find().sort('name')
    res.status(200).json(courses)
})

router.get('/:id',async (req,res) => {
    const id = req.params.id
    
    const isValid = monogoose.Types.ObjectId.isValid(id)
    if(!isValid) return res.status(400).send('Inavlid course id')
    
    const course = await Courses.findById(id)
    console.log(course)

    if(!course) return res.status(400).send('Invalid course id --- course not found')

    console.log(chalk.green('course found'))
    res.send(course)
})

router.post('',async (req,res) => {
    let course = new Courses({
        courseCode: req.body.courseCode,
        courseTitle: req.body.courseTitle,
        courseUnit: req.body.courseUnit
    })
    try{
        course = await course.save()
        res.send(course);
        console.log(chalk.green('Course saved'))
    }catch(err){
        for(field in err.errors)
            console.log(chalk.red(err.errors[field]))
            res.status(400).send(err.errors[field].message)        
    }

})

router.put('/:id',async (req,res) => {
    
    const id = req.params.id
    const course = await Courses.findById(id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    
    course.set({
        courseCode: req.body.courseCode,
        courseTitle: req.body.courseTitle,
        courseUnit: req.body.courseUnit
    })
    try{
        course = await course.save()
        res.send(course)
        console.log(chalk.green('Course updated'))
    }catch(err){
        console.log(chalk.red(err.errors))
        res.status(400).send(err.errors)
    }
})

router.delete('/:id',async (req,res) => {
    const course = await Courses.findByIdAndRemove(req.params.id)

    if(!course) return res.status(400).send('The course with the given ID was not found')
    
    res.send(course)
})

module.exports = router;