var express = require('express');
const controller=require('../controllers/UserControllers');
const session=require('../controllers/SessionController');

let router=express.Router();

/* GET users listing. */
router.route('/')
.post(
    controller.create,
    session.generateToken,
    session.sendToken)
.get(
    controller.myplaces
)


module.exports = router;
