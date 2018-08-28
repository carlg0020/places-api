const mongoose = require('mongoose');

let placeSchema =new mongoose.Schema({
    _user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    
    _place:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Place',
        required:true
    }
});

let FavoritePlace=mongoose.model('FavoritePlace',placeSchema);

module.exports=FavoritePlace;