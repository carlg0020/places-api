var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser');
var jwtmiddleware=require('express-jwt');

const db = require('./config/database');
const secret=require('./config/secrets');

const places =require('./routes/places');
const users =require('./routes/users');
const sessions =require('./routes/sessions');
const favorites =require('./routes/favorites');
const comments =require('./routes/comments');
const applications =require('./routes/applications');

const findAppSecret =require('./middleware/findAppBySecret');
const finAppById =require('./middleware/finAppById');
const authApp =require('./middleware/authApp')();
const allowcors =require('./middleware/allowCORS')();


db.connect();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
jwtmiddleware({
  secret:secret.jwtSecret
})
.unless({path:['/sessions','/users'],method:['GET','OPTIONS']})
);

app.use(findAppSecret);
app.use(finAppById);
app.use(authApp.unless({method:'OPTIONS'}));
app.use(allowcors.unless({path:'/public'}));

app.use('/places',places)
app.use('/users',users)
app.use('/sessions',sessions)
app.use('/favorites',favorites)
app.use('/comments',comments)
app.use('/applications',applications)




app.use(function(req, res, next) {
  next(createError(404));
});



app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
