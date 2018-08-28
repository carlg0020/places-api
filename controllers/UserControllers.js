const helpers=require('./helpers');
const User=require('../models/User');

const validParams=["email","name","password"];

function create(req,res,next)
{
    const params=helpers.buildParams(validParams,req.body);

    User.create(params)
      .then(user=>{
        req.user=user;
        next();
      })
      .catch(err=>{
        console.log(err);
          res.status(422).json({
            error:"Could not create user"
        });
      })
}
function myplaces(req,res)
{
  User.findOne({'_id':req.user.id}).then(user=>{
    user.places.then(places=>{
      res.json(places);
    })
    .catch(err=>{
      res.json(err);
    })
  })
}
module.exports={create,myplaces}
