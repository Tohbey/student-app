const express = require('express')
const students = require('../controllers/students')
const courses = require('../controllers/courses')
const users = require('../controllers/users')
const auth = require('../controllers/auth')
const error = require('../middleware/error')

module.exports = function(app) {
    app.use(express.json());
    app.use('/students',students)
    app.use('/courses',courses)
    app.use('/users',users)
    app.use('/auth',auth)
    app.use(error);
  }