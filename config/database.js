const mongoose = require('mongoose');
const dbName="places";
module.exports ={
    connect: () => mongoose.connect('mongodb://localhost/'+dbName,{ useNewUrlParser: true } ),
    dbName,
    connection:()=>{return mongoose.connection?mongoose.connection:this.connect()}
}