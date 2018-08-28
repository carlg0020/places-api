const Place=require('../models/Place');
const upload=require('../config/upload');
const uploader=require('../models/Uploader');
const helpers=require('./helpers');

const validParams=["title","description","address","slug","acceptCreditCard","coverImage","avatarImage","openHour","closeHour"];

function find(req,res,next)
{
    Place.findOne({slug:req.params.id})
    .then(place=>{
        req.place=place;
        req.mainObj=place;
        next();
    })
    .catch(err=>{
      next(err);
    })
}

function index(req,res)
{
    Place.paginate({}, {page:req.query.page || 1, limit:10, sort:{'_id':-1} })
    .then(places=>{
      res.json(places)
    })
    .catch(err=>{
      console.log(err);
      res.json(err);
    })
}

function show(req,res)
{
    res.json(req.place);
}

function create(req,res,next)
{
    const params=helpers.buildParams(validParams,req.body);
    params['_user']=req.user.id;

    Place.create(params)
      .then(doc=>{
          req.place=doc;
          next();
      })
      .catch(err=>{
        console.log(err);
        next(err);
      })
}

function update(req,res)
{
    const params=helpers.buildParams(validParams,req.body);
    req.place=Object.assign(req.place,params);

    req.place.save().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        console.log(err);
        res.json(err);
    });
}

function destroy(req,res)
{
    request.place.remove().then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function multer(){
    return upload.fields([
        {name:'avatar',maxCount:1},
        {name:'cover',maxCount:1}
    ]);
}

function saveImage(req,res){
    if(req.place)
    {
        const files=['avatar','cover'];
        const promises=[];
        files.forEach(type =>{
            if(req.files && req.files[type])
            {
                let path=req.files[type][0].path;
                promises.push(req.place.updateImage(path,type));
            }
        });

        Promise.all(promises).then(result=>{
            res.json(req.place);
        })
        .catch(err =>{
            res.json(err);
        })
        
    }else{
        res.status(422).json({
            error:req.error || 'Cloudinary error'
        });
    }
}

module.exports={index,create,show,update,destroy,find,multer,saveImage}