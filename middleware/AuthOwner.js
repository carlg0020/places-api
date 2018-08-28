module.exports=function(req,res,next){
    if(req.mainObj && (req.mainObj._user==req.user.id)) return next();

    res.json({"error":'You have no permissions'});

}