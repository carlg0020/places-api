const mongoose = require('mongoose');
const paginate=require('mongoose-paginate');
const uploader=require('./Uploader');
const slugify=require('../plugins/slugify');

let placeSchema =new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        index:true
    },
    address:String,
    description:String,
    acceptCreditCard: {
        type:Boolean,
        default:false
    },
    coverImage:String,
    avatarImage:String,
    openHour:Number,
    closeHour:Number,
    _user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});
placeSchema.plugin(paginate);

placeSchema.statics.validateSlug=function(slug)
{
    return Place.count({slug: slug}).then(count=>{
        if(count > 0) return false;
        return true;
      })
    
}
placeSchema.pre('save',function(next){
    if(this.slug) return next();
    generateSlug.call(this,0,next);
});

function generateSlug(count,next)
{
    this.slug=slugify(this.title);

    if(count!=0)
        this.slug=this.slug + "-"+count;
        

    Place.validateSlug(this.slug).then(value=>{
        if(!value)
            return generateSlug.call(this,count+1,next);
        
        next();
    })
}

placeSchema.methods.updateImage=function(path,type){
    return uploader(path).then(url=>this.saveImageUrl(url,type))

}

placeSchema.methods.saveImageUrl=function(url,type)
{
    this[type+'Image']=url;
    return this.save();
}

let Place=mongoose.model('Place',placeSchema);

module.exports=Place;