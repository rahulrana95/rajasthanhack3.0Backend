/**
All tests done successfully
**/

var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cors = require('cors');
var router = express.Router();
var app = express();
var mysql = require('mysql');
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dhpyfeq0n',
  api_key: '325643915669763',
  api_secret: 'SdchmAzUyWzI9qnqS2HZhyb5Wko'
});
var connection = mysql.createPool({
  host     : 'testbot.c0ccjbvvdqns.us-east-2.rds.amazonaws.com',
  user     : 'maniax',
  password : '9068390682Rr',
  database : 'testing',
  port     : 3306
});
app.use(cors());
app.set('port',  process.env.PORT || 3000 );
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : false }));

/*
var home = router.get('/complaint', function(req, res){
    var off = 50*parseInt(req.query.offset);
    var q = `SELECT * FROM complaint ORDER BY id DESC LIMIT 50 OFFSET ${off} `;
    connection.query(q, function(err, result) {
      if (err) {
        console.log(err);
        res.json({
          "status" : "404",
          "error" : err
        });
      }
      else {
        res.json({
          "status" : "200",
         "result" : result
        });
      }
    });
});
app.use(home);
var home1 = router.get('/complaint1', function(req, res) {
    var off = 50*parseInt(req.query.offset);
    var q = `SELECT * FROM complaint WHERE statusCheck = 1 ORDER BY id DESC LIMIT 50 OFFSET ${off} `;
    connection.query(q, function(err, result) {
      if (err) {
        console.log(err);
        res.json({
          "status" : "404",
          "error" : err
        });
      }
      else {
        res.json({
          "status" : "200",
          "result" : result
        });
      }
    });
});
app.use(home1);

app.use(
  router.post('/api', function(req, res){
      var firstName = req.body['first name'];
      var lastName = req.body['last name'];
      var messengerUserId = req.body['messenger user id'];
      var details = req.body['details'];
      var photo = req.body['photo'];
      var address = req.body['address'];
      var city = req.body['city'];
      var country = req.body['country'];
      var gender = req.body['gender'];
      var description = req.body['Description'];
      var mapURL = req.body['map url'];
      var state = req.body['state'];
      var statusCheck = 1;
      var image;

      cloudinary.uploader.upload(photo, function(result) {
        image = result.url;
        console.log(photo);
        console.log(result.url);
        var q = `INSERT INTO complaint VALUES ('', '${firstName}', '${lastName}', '${messengerUserId}', '${details}', '${image}', '${address}', '${city}', '${country}', '${gender}', '${description}', '${mapURL}', '${state}', '${statusCheck}');`;
        connection.query(q, function(err, result) {
          if (err) {
            console.log(err);
            res.json({
              "status" : "404",
              "error" : err
            });
          }
          else {
            res.json({
              "status" : "200",
              "result" : result
            });
          }
        });
      });
  })
);
*/




app.set('connection', connection);
var server = app.listen(app.get('port'),  function() {
  console.log('Listening on port ' + app.get('port'));
});
reload(server,  app);
