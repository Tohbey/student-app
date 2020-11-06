const express = require('express')
const router = express.Router()
const User = require('../models/user')
const monogoose = require('mongoose')
const chalk = require('chalk')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const authorization = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('',[authorization,admin],async (req,res) => {
    const users = await User.find();
    res.status(200).json(users)
})

router.post('',async(req,res) => {
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('Email already exist')

    const salt = await bcrypt.genSalt(10);

    user = new User(_.pick(req.body,['surname','othernames','email','password']));
    
    user.password = await bcrypt.hash(user.password,salt);
    
    try{
        user = await user.save()  
        console.log(chalk.green('User saved'))

        const token = user.generateAuthToken()
        res.header('x-auth-token',token).send(_.pick(user,['_id','surname','othernames','email']))
    }catch(err){
        res.status(400).send(err.errors)
        console.log("Saving users in users.js "+err.errors)
    }

})

module.exports = router