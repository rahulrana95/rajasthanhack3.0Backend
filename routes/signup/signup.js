/**
  All tests done successfully
**/
var express = require('express');
var reload = require('reload');
var request = require('request')  ;
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
var router = express.Router();
var signup =router.post('/signup',function(req,res){
    var connection = req.app.get('connection');
    console.log('called');
    console.log(req.body);
    var cardNumber = req.body.cardNumber;
    var password = req.body.password;
    var clientId = req.body.clientId;
    var ackId    = req.body.ackId;
    var q= `SELECT cardNumber,username,password,COUNT(id) AS num FROM login WHERE cardNumber = '${cardNumber}'`;
    connection.query(q, function(err, result) {
      if (err) {
        console.log(err);
        res.json({
          "status" : "404",
          "error" : err,
          "message" : "something went wrong"
        });
      }
      else {

        if(result[0].num == 1){
        res.json({
          "status":"402",
          "message":"user already exist"
        })
      }
      else {
        var bhamashah_id=ackId;
        var bM_id=cardNumber;
        var client_id=clientId;

        request.get({ url: "https://apitest.sewadwaar.rajasthan.gov.in/app/live/Service/hofMembphoto/"+bhamashah_id+"/"+bM_id+"?client_id="+client_id },      function(error, response, body) {
             if (!error ) {
               console.log('success');


               request.get({ url: "https://apitest.sewadwaar.rajasthan.gov.in/app/live/Service/hofAndMember/ForApp/"+bhamashah_id+"?client_id="+client_id },      function(error, response2, body2) {

                  if (!error){
                    var data = response2.body;
                    data = JSON.parse(data);
                    var mobile = data["hof_Details"]["MOBILE_NO"];
                    var name = data["hof_Details"]["NAME_ENG"];
                    var size = data["hof_Details"]["MOBILE_NO"]
                    console.log(mobile);
                    res.json({
                      "status":200
                    });
                  }
                  else {

                    res.json({
                      "status":404
                    });

                  }


               });


             }
             else {
               console.log(response.body);
               res.json({"status":"error"});
             }

            });

      }
        }
    });
});
module.exports = signup;
