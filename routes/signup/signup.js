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
        var pass=password;

        request.get({ url: "https://apitest.sewadwaar.rajasthan.gov.in/app/live/Service/hofMembphoto/"+bhamashah_id+"/"+bM_id+"?client_id="+client_id },      function(error, response, body) {
             if (!error ) {
               console.log('success');


               request.get({ url: "https://apitest.sewadwaar.rajasthan.gov.in/app/live/Service/hofAndMember/ForApp/"+bhamashah_id+"?client_id="+client_id },      function(error, response2, body2) {

                  if (!error){
                    var data = response2.body;
                    data = JSON.parse(data);
                    var mobile = data["hof_Details"]["MOBILE_NO"];
                    var name = data["hof_Details"]["NAME_ENG"];
                    var size = Object.keys(data["family_Details"]).length;
                    var member_Name=[];
                    var relation_Name=[];
                    var gender_Name=[];
                    var bhamashah_Id=[];
                    
                    console.log(mobile);
                    var q1 = `INSERT INTO login (cardNumber, username, password, mobileNumber) VALUES ('${bM_id}', '${bM_id}', '${pass}', ${mobile})`;
                    connection.query(q1, function(err, result) {
                      if (err){
                        res.json({
                          "status":404,
                          "message":"duplicate entry"
                        })

                      } 
                      var lid = result.insertId;
                      var q2 = `INSERT INTO users (cardNumber, mobileNumber, noOfMembers, lId,clientId,ackId,name) VALUES ('${bM_id}', ${mobile}, ${size},${lid},'${client_id}','${bhamashah_id}','${name}' )`;
                      connection.query(q2, function(err2, result2) {
                      if (err2){
                        res.json({
                          "status":404,
                          "error":err2,
                          "message":"duplicate entry2"
                        })

                      }
                      else{
                        console.log(result2);
                        var Uid = result2.insertId;
                        var flag = 0;
                        for (var i = size-1; i >= 0; i--) {
                        member_Name[i]=data["family_Details"][i]["NAME_ENG"];
                        relation_Name[i]=data["family_Details"][i]["RELATION_ENG"];
                        gender_Name[i]=data["family_Details"][i]["GENDER"];
                        bhamashah_Id[i]=data["family_Details"][i]["BHAMASHAH_ID"];
                        var q3 = `INSERT INTO familyMembers (memberName, relationName, gender, uid,bhamashahId) VALUES ('${member_Name[i]}', '${relation_Name[i]}', '${gender_Name[i]}',${Uid},'${bhamashah_Id[i]}' )`;
                        connection.query(q3, function(err3, result3) {
                        if (err3){
                          res.json({
                            "status":404,
                            "error":err3,
                            "message":"duplicate entry3"
                          })

                        }
                        else
                        {
                          if (flag==0) {

                            flag=1;
                            res.json({
                              "status":200,
                              "message":"success"
                            });
                          }
                          
                        }
                      });
                        };
                      } 

                    });
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
