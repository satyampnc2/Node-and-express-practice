const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user');

//Register form
router.get('/register',(req,res)=>{
    res.render('register');
});

//Register Process
router.post('/register',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    console.log('request is here')
    const newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password
    })

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err){
                console.log(err);
            } else{
                newUser.password=hash;
                newUser.save((err)=>{
                    if(err){
                        console.log(err);
                        return;
                    } else{
                        res.redirect('/users/login');
                    }
                })
            }
        });

    });
})
router.get('/login',(req,res)=>{
    res.render('login');
})

module.exports = router;