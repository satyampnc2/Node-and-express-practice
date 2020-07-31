const express = require('express');
const User = require('../models/User');
const route = require('express').Router();
const {registerValidation, loginValidation} = require('./validation');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const jwtauth =  require('./auth');

route.post('/add',async (req,res)=>{
    const error = registerValidation(req.body);
    if(error){
        res.send(error.details[0].message);
    } else{
        //Every database call has to be made using await if
        //the returned result is to be used outside.
        const emailExist = await User.findOne({email:req.body.email});
        if(emailExist){
            res.status(400).send('email alreay exist');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        });
        try{
            const response = await newUser.save();
            res.send(response);
        }
        catch{
            res.status(400).send('error occured');
        }
    }
})

route.post('/post',jwtauth,async (req,res)=>{
    //const user = User.findOne({_id:req.user._id});
    const user = await User.findOne({_id:req.user._id});
    res.send(user);
})

route.post('/login',async (req,res) => {
    const error = loginValidation(req.body);
    if(error){
        res.send(error.details[0].message);
    } else{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status(400).send('email doesnt exist');
            return;
        }

        const token = jwt.sign({_id:user._id},process.env.AUTH_TOKEN);
        const valPass = await bcrypt.compare(req.body.password,user.password);
        if(valPass){
            res.send('yayy logged in');
            res.header('auth-token',token);
        } else{
            res.status(400).send('wrong pass');
        }
    }
})

route.get('/',(req,res)=>{
    User.find({},(err,users)=>{
        if(err){
            console.log('error is : '+err);
        } else{
            res.json(users);
        }
    })
})

module.exports = route;