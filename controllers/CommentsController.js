const favorite=require('../models/FavoritePlace');
const helpers=require('./helpers');
const comment=require('../models/Comment');
const User=require('../models/User');

const validParams=["_place","reaction","comment"];

function find(req,res,next)
{
    comment.findById(req.params.comment_id)
    .then(comment=>{
        req.comment=comment;
        req.mainObj=comment;
        next();
    })
    .catch(err=>{
      next(err);
    })
}


function getByUser(req,res)
{
  
    


}

function getByPlace(req,res)
{
  

}

function create(req,res,next)
{
    const params=helpers.buildParams(validParams,req.body);
    params['_user']=req.user.id;

    comment.create(params)
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
    req.comment.remove().then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
      })
}

module.exports={create,destroy,find,getByPlace,getByUser}