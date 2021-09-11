var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const authenticate = require('../authenticate');

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.get('/',function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/signup',(req,res,next)=>{
  User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
        }else{
          user.name = req.body.fullname;
          user.age = req.body.age;
          user.save((err,user)=>{
            if(err){
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
              return;
            }
            else{
              passport.authenticate('local')(req,res,()=>{
                res.statusCode = 200;
                res.redirect('/home');
              })
            }
            
          });
        }
    })
});


router.post('/login',passport.authenticate('local'),(req,res)=>{
  res.statusCode = 200;
  res.redirect('/home');
});

router.get('/logout',(req,res)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('blood-session');
    res.redirect('/');
  }
})


module.exports = router;
