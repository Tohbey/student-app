const express = require('express')
const winston = require('winston')
const app = express()

require('../startup/logging')
require('../startup/routes')(app)
require('../startup/db')();

app.get('',(req,res) => {
    res.send({
        title:'Student App',
        name:'Tobi Fafowora'
    })
})

app.listen(3000, () => {
        winston.info("Project running on port 3000")
    }
)

