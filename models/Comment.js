const mongoose = require('mongoose');
const paginate=require('mongoose-paginate');

const reactions=['like','love','funny','awesome','sad','angry'];
let commentSchema=new mongoose.Schema({
    _user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    
    _place:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Place',
        required:true
    },
    comment:String,
    reaction:{
        type:String,
        enum:reactions
    }
});

commentSchema.plugin(paginate);

const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;