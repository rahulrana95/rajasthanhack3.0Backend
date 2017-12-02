/**
  All tests done successfully
**/
var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var router = express.Router();
var login = router.post('/login',function(req,res){
    var connection = req.app.get('connection');
    var userName = req.body.username;
    var password = req.body.password;
    var q= `SELECT userName,password,COUNT(id) AS num,user FROM users WHERE userName = '${userName}'`;
    connection.query(q, function(err, result) {
      if (err) {
        console.log(err);
        res.json({
          "status" : "404",
          "error" : err
        });
      }
      else {
        bcrypt.compare(password,result[0].password ,function(err,check) {
          if (err || result[0].num != 1) {
            res.json({
              "status" : "200",
              "verifyStatus" : false
            });
          }
          else {
            res.json({
              "status" : "200",
              "verifyStatus" : check,
              "user":result[0].user
            });
          }
          });
        }
    });
});
module.exports = router;
