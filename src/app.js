const express = require('express')
const chalk = require('chalk')
const students = require('../routes/students')
const courses = require('../routes/courses')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/student')
    .then(() => console.log(chalk.green('Connected to MongoDB')))
    .catch((err) => console.log(chalk.red('Erro ' +err)))

const app = express()
app.use(express.json())
app.use('/students',students)
app.use('/courses',courses)

app.get('',(req,res) => {
    res.send({
        title:'Student App',
        name:'Tobi Fafowora'
    })
})

app.listen(3000, () => {
    console.log(chalk.green("Project running on port 3000"))
})

