module.exports=function(req,res,next){
    
    if(req.fullUser && req.fullUser.admin) return next();

    console.log(req);

    res.json({"error":"You have no permissions"});
}