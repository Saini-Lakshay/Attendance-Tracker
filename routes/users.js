const router = require('express').Router();
const User = require('../models/user.model');
require('../server');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var express = require('express');
var app = express();




router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.sendStatus(400).json('Error : '+ err));
});

router.route('/add').post((req, res) => {
    User.findOne({email : req.body.email})
    .then(docs=>{
        if(docs)
        {
            res.send('User Already Exists')
        }else{
            let user = new User;
            user.email = req.body.email;
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err)
                {
                    res.send(err)
                }
                else{
                    user.password = hash;
                //    console.log(user)
                    user.save()
                    .then(()=>{
                        res.send('submitted')
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                }
            })
        }
    })
    
})
router.post('/login',(req,res)=>{
   // console.log(req.body)
    User.findOne({email : req.body.email})
    .then(docs=>{
        if(docs)
        {
            console.log("Encrypt");
        //    console.log(docs.password,req.body.password)
            bcrypt.compare(req.body.password,docs.password,(err,isMatched)=>{
                console.log(isMatched)
                if(err)
                {
                    res.send(err)
                }
                
                else if(isMatched)
                {
                    jwt.sign({id : docs._id},'LAKSHAY',(err,token)=>{
                        if(err)
                        {
                            res.send(err);
                        }
                        res.send({token})
                    })
                }
                else{
                    res.send('Password incorrect')
                }
            })
        }
        else{
            res.send("User doesn't exist");
        }
    })
})

router.route('/logout').get((req, res) => {
    req.logOut();
    res.redirect("/users/login");
})






module.exports = router;