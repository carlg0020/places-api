var express = require('express');
const controller=require('../controllers/PlacesController');

const authOwner=require('../middleware/AuthOwner');


    let router=express.Router();

    router.route('/')
    .get(controller.index)
    .post(
        controller.multer(),
        controller.create,
    controller.saveImage)

    router.route('/:id')
    .get(controller.find,controller.show)
    .put(controller.find,authOwner,controller.update)
    .delete(controller.find,authOwner,controller.destroy)

module.exports=router;