
const jwt=require('jsonwebtoken');
const secrets=require('../config/secrets');
const User=require("../models/User");


function login(req,res,next)
{
    
    User.findOne({email: req.body.email})
    .then(user=>{
        user.verifyPassword(req.body.password)
        .then(valid=>{
            if(valid) 
            {
                req.user=user;
                next();
            }else{
                res.status(401).json({
                    error:"invalid credentials"
                });
            }
        })
        .catch(err=>{
            res.status(422).json({
                error:"invalid credentials"
            });
        })
    })
    .catch(err=>{
        res.status(422).json({
            error:"invalid credentials"
        });
    })
}

function generateToken(req,res,next)
{
    if(!req.user) return next()
    
    req.token=jwt.sign({id:req.user._id},secrets.jwtSecret)

    next();
}

function sendToken(req,res){

    if(req.user)
    {
        res.json({user:req.user,token:req.token});
    }else{
        res.status(422).json({
            error:"Could not create user"
        });
    }

}

module.exports={login,generateToken,sendToken}