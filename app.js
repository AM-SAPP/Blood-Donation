var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session  = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const homeRoute = require('./routes/home');
const DonarRoute = require('./routes/donar');
const FileStore = require('session-file-store')(session);
const mongoose = require('mongoose');
const authenticate = require('./authenticate');
var app = express();


const url = 'mongodb://localhost:27017/bloodapp'
mongoose.connect(url)
  .then((db)=>{
    console.log("Connected to database");
  })
  .catch((err)=>{
    next(err);
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  name: 'blood-session',
  secret: "bfgisaebvgfioyywq323r23rfeaf",
  saveUninitialized: false,
  resave: false,
  store: new FileStore({logFn: function(){}}),
  cookie:{
    maxAge: 60*60*24*1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const auth = (req,res,next)=>{
  if(!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  }
  else {
    next();
  }
}


app.use('/', indexRouter);
app.use('/users',usersRouter);

app.use(auth);

app.get('/donateForm',(req,res)=>{
  res.render('donateForm');
})

app.get('/home',(req,res)=>{
  res.render('home')
})

app.get('/success',(req,res)=>{
  res.render('postSuccess');
})
app.use(express.static(path.join(__dirname, 'public')));
app.use('/home',homeRoute);
app.use('/donate',DonarRoute)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
