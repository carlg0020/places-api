var express = require('express');
const controller=require('../controllers/FavoritesController');
const authOwner=require('../middleware/AuthOwner');
const jwtMiddleware=require('express-jwt');
const secrets=require('../config/secrets');
const findUser=require('../middleware/findUser');


    let router=express.Router();

    router.route('/')
    .get(jwtMiddleware({secret:secrets.jwtSecret}),findUser,controller.index)
    .post(controller.create)

    router.route('/:id')
    .delete(controller.find,authOwner,controller.destroy)
    /*.get(controller.find,controller.show)
    .put(controller.find,authOwner,controller.update)*/
    

module.exports=router;