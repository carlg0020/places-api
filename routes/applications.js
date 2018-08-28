var express = require('express');
const controller=require('../controllers/ApplicationController');
const authAdmin=require('../middleware/authAdmin');
const findUser=require('../middleware/findUser');
const jwtMiddleware=require('express-jwt');
const secrets=require('../config/secrets');




    let router=express.Router();

    router.all('*',jwtMiddleware({secret:secrets.jwtSecret}),findUser,authAdmin);

    router.route('/')
    .get(controller.index)
    .post(controller.create)

    router.route('/:id')
    .delete(controller.find,controller.destroy)
    /*.get(controller.find,controller.show)
    .put(controller.find,authOwner,controller.update)*/
    

module.exports=router;