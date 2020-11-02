const express = require('express')
const chalk = require('chalk')

const app = express()
app.use(express.json())

let data = [
    {
        id:1,
        name:'Fafowora',
        course:'Computer Engineering'
    },
    {
        id:2,
        name:'tomiwa',
        course:'Systems Engineering'
    }
]

app.get('',(req,res) => {
    res.send({
        title:'Student App',
        name:'Tobi Fafowora'
    })
})

app.get('/students',(req,res) => {
    res.status(200).json(data)
})

app.get('/student/:id',(req,res) => {
    const id = req.params.id
    const student = data.find((students) => {
        return students.id === parseInt(id);
    })
    if(!student){
        console.log(chalk.red('Invalid Student id'))
        return res.status(400).send('Invalid Student id')
    }
    console.log(student)
    console.log(chalk.green('student found'))
    res.send(student)
})

app.post('/students',(req,res) => {
    const student = {
        id:data.length+1,
        name:req.body.name,
        course:req.body.course
    }
    if(!student.name || !student.course){
        return res.status(400).send('invalide input')
    }
    data.push(student)
    res.status(201).json(student)
})

app.put('/student/:id',(req,res) => {
    const id = req.params.id
    const student = data.find((students) => {
        return students.id === parseInt(id);
    })
    if(!student){
        console.log(chalk.red('Invalid Student id'))
        return res.status(400).send('Invalid Student id')
    }
    const newStudent = {
        name:req.body.name,
        course:req.body.course
    }
    if(!newStudent.name || !newStudent.course){
        return res.status(400).send('invalide input')
    }
    res.send(newStudent)
})

app.delete('/student/:id',(req,res) => {
    const id = req.params.id
    const student = data.find((students) => {
        return students.id === parseInt(id);
    })
    if(!student){
        console.log(chalk.red('Invalid Student id'))
        return res.status(400).send('Invalid Student id')
    }
    const index = data.indexOf[student]
    data.splice(index,1)
})

app.listen(3000, () => {
    console.log(chalk.green("Project running on port 3000"))
})

