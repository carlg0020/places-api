const application=require('../models/Application');

module.exports=function(req,res,next){
    if(req.xhr) return next();

    const secret= req.headers.secret;

    if(!secret) return next();

    application.findOne({secret})
    .then(app=>{
        if(!app) return res.json({error:"Application Error"});
        
        req.application=app;
        next();
    })
    .catch(err=>{
        return res.json({error:"Application Error"});
    })
}