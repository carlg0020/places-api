const mongoose = require('mongoose');

const randomstring=require('randomstring');

function assignUniqueString(app,field,next){
    const random=randomstring.generate(20);
    let search={};
    search[field]=random;
    Application.count(search).then(count=>{
        if(count>0) return assignUniqueString(app,field,next);

        app[field]= random;
        next();
    })
    .catch(err=>{
        console.log('Error'+ err);
    })
}

let applicationSchema=new mongoose.Schema({
    applicationId:{
        type:String,
        required:true,
        unique:true
    },
    secret:{
        type:String,
        required:true,
        unique:true
    },
    origins:String,
    name:String
});

applicationSchema.pre('validate',function (next){
    assignUniqueString(this,'applicationId',()=>{
        assignUniqueString(this,'secret',next);
    });
});

const Application = mongoose.model('Application',applicationSchema);



module.exports=Application;