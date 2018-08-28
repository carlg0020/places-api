var express = require('express');
const session=require('../controllers/SessionController');

let router=express.Router();

/* GET users listing. */
router.route('/')
.post(
    session.login,
    session.generateToken,
    session.sendToken)


module.exports = router;
