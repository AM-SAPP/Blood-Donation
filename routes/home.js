var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');
/* GET home page. */




router.get('/', function(req, res, next) {
  // console.log(req.cookies);
  res.render('index', { title: 'Home' });
});


module.exports = router;