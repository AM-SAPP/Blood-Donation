var express = require('express');

var router = express.Router();
const cookieParser = require('cookie-parser');

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/signup',(req,res)=>{
  res.render('signup')
})




module.exports = router;
