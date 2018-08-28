const favorite=require('../models/FavoritePlace');
const helpers=require('./helpers');
const User=require('../models/User');

const validParams=["_place"];

function find(req,res,next)
{
    favorite.findById(req.params.id)
    .then(fav=>{
        req.favorite=fav;
        req.mainObj=fav;
        next();
    })
    .catch(err=>{
      next(err);
    })
}


function index(req,res)
{
    if(!req.fullUser) return res.json({})
        req.fullUser.favorites.then(places=>{
          res.json(places);
        })
        .catch(err=>{
            res.json({"error":'an error ocurred'});
        })
     

}
function create(req,res,next)
{
    const params=helpers.buildParams(validParams,req.body);
    params['_user']=req.user.id;

    favorite.create(params)
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
    req.favorite.remove().then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
      })
}

module.exports={create,destroy,find,index}