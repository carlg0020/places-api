const application=require('../models/Application');


module.exports=function(options){
    let authApp= function(req,res,next){
        application.count({}).then(appCount=>{
            if(appCount>0 && !req.application) return next(new Error('you need an app'));
            req.validApp=true;
            next();
        }).catch(err=>{
            return res.status(500).json({error:"Application Error"});
        })
    }

    authApp.unless=require('express-unless');
    return authApp;
}

    
    


