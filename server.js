var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express();
var uuid = require('uuid');

var freshBook = function(){  return{"id":"", "title":"" , "description":"" , "authors": [ ]}  };
var successOutputFactory = function(){  return{  "success":"true"   }  };
var failOutputFactory = function(){  return{  "success":"false", "error":""   }  };

//GET VERSION URI---------------------------------------------------
var versionResp = {
                "response": { "status": 200, "version": "1.0.0" }
              };
	//var versionResp= require(versionResp1);
			  
//Response for GET-Version 			  
app.get('/version',function(req, res){
	console.log(versionResp);
	res.end(JSON.stringify(versionResp));
});			  


//DELETE BOOK URI -------------------------------------------------------
var deleteResp = {
  "response": { "status": 200, "message": "success" }
}
app.delete('/node/:book_id', function (req, res) {
	deleteResp.txID = uuid.v4();
	deleteResp.URL = book_id;
});

var deleteResp = {
  "response": { "status": 200, "message": "success" }
}
app.get('/node/:book_id', function (req, res) {
	deleteResp.txID = uuid.v4();
	deleteResp.URL = req.params.book_id;
  res.end(JSON.stringify(deleteResp));
});
app.get('/simple', function (req, res) {
  deleteResp.txID = uuid.v4();
  res.end(JSON.stringify(deleteResp));
});

//SERVER SETUP

//CORS resolution
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
};
app.use(allowCrossDomain);
var server = app.listen(9190, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})
