const mongoose = require('mongoose')
const winston = require('winston')
require('dotenv').config();
const dbUrl = process.env.MONGO_URL

module.exports = function(){
    mongoose.connect(dbUrl)
    .then(() => winston.info('Connected to MongoDB....'))
}
