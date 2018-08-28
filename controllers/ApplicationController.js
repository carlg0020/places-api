

const application=require('../models/Application');
const helpers=require('./helpers');
const User=require('../models/User');

const validParams=["origins","name"];

function find(req,res,next)
{
    application.findById(req.params.id)
    .then(app=>{
        req.application=app;
        req.mainObj=app;
        next();
    })
    .catch(err=>{
      next(err);
    })
}


function index(req,res)
{
    
}
function create(req,res,next)
{
    const params=helpers.buildParams(validParams,req.body);
    params['_user']=req.user.id;

    application.create(params)
      .then(doc=>{
          res.json(doc);
      })
      .catch(err=>{
        console.log(err);
        res.status(422).json(err);
      })
}

function destroy(req,res)
{
    req.application.remove().then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
      })
}

module.exports={create,destroy,find,index}