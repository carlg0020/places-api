var express = require('express');
const controller=require('../controllers/CommentsController');
const authOwner=require('../middleware/AuthOwner');
const jwtMiddleware=require('express-jwt');
const secrets=require('../config/secrets');


    let router=express.Router();

    router.route('/')
    .post(controller.create)

    router.route('/:id')
    .delete(controller.find,authOwner,controller.destroy)
    /*.get(controller.find,controller.show)
    .put(controller.find,authOwner,controller.update)*/

    router.route('/place/:id')
    .get(jwtMiddleware({secret:secrets.jwtSecret}),controller.getByPlace)

    router.route('/user/:id')
    .get(jwtMiddleware({secret:secrets.jwtSecret}),controller.getByUser)
    

module.exports=router;