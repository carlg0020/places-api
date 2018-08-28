const mongoose = require('mongoose');
const bcrypt=require('mongoose-bcrypt');
const Place =require('./Place');
const FavoritePlace =require('./FavoritePlace');


let userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        index:true
    },
    password:{

    },
    name:String,
    admin:{
        type:Boolean,
        default:false
    }
});

userSchema.plugin(bcrypt);

userSchema.virtual('places').get(function(){
    return Place.find({'_user':this._id});
});

userSchema.virtual('favorites').get(function(){

    return FavoritePlace.find({'_user': this._id}, {'_place': true})  
        .then(favs => {  
            let placesIds = favs.map(fav => fav._place);  
            
            return Place.find({'_id': {$in: placesIds}})  
        }) 
});

userSchema.post('save',function(user,next){
    User.count({})
    .then(count=>{
        if(count==1)
        {
            user.admin=true;
            user.save();
        }

        next();
    })
});

const User = mongoose.model('User',userSchema);

module.exports=User;