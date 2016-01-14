var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express();
var uuid = require('uuid');
var mysql = require('mysql');

app.use(express.static('../clientside'));
var con = mysql.createConnection({
  "host": "localhost",
  "user": "root",
  "password": "1954",
  "database": "world"
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(cors());

//BOOK-BLOB
//http://stackoverflow.com/questions/10932584/array-push-makes-all-elements-the-same-when-pushing-an-object
var freshBook = function(){  return{"id":"", "title":"" , "description":"" , "authors": [ ]}  };


var successOutputFactory = function(){  return{  "success":"true"   }  };
var failOutputFactory = function(){  return{  "success":"false", "error":""   }  };

//------------------------------DELETE : SHA TESTING BRIM 0001-----------------------------------------


app.get('/hash/:inputText',function(req, res){
	try{
		var blankOutput = successOutputFactory();
		console.log(blankOutput);
		var crypto = require('crypto') , shasum = crypto.createHash('sha1');
		blankOutput.input = req.params.inputText ;
		shasum.update(blankOutput.input+ 'csv');
		blankOutput.hashValue = shasum.digest('hex');
		console.log(blankOutput);
		res.end(JSON.stringify(blankOutput));
	}catch(err){
		var failOP = failOutputFactory();
		failOP.error = err.message;
		res.end(JSON.stringify(failOP));
	}
	
	
});	


app.get('/employee',function(req, res){
	var blankOutput = successOutputFactory();
	try{
		console.log(blankOutput);
		blankOutput.employee = [];
		
		//blankOutput populate-------------
		con.query('SELECT * FROM employees',function(err,rows){
			blankOutput.employees = rows;	
			console.log(blankOutput);
			con.end();
			res.end(JSON.stringify(blankOutput));
		});
			
	}catch(err){
		var failOP = failOutputFactory();
		failOP.error = err.message;
		con.end();
		res.end(JSON.stringify(failOP));
	}
	
	
});


app.get('/employee/:id',function(req, res){
	var queryString = "SELECT * FROM employees WHERE id="+req.params.id;
	var blankOutput = successOutputFactory();
	
	try{
		console.log(blankOutput);
		blankOutput.employee = {};
		
		//blankOutput populate-------------
		con.query(queryString,function(err,rows){
			blankOutput.employee = rows[0];	
			console.log(blankOutput);
			con.end();
			res.end(JSON.stringify(blankOutput));
		});
			
	}catch(err){
		var failOP = failOutputFactory();
		failOP.error = err.message;
		con.end();
		res.end(JSON.stringify(failOP));
	}
	
	
});


//------------------------------DELETE : SHA TESTING BRIM 0001-----------------------------------------





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

//LIST BOOKS URI---------------------------------------------------
var book1 = {
       "id": "1cb4ae39-c92a-4524-89de-72202ec13f0e",
       "title": "REST API Design Rulebook",
       "description": "The basic rules of REST APIs - \"many nouns, few verbs, stick with HTTP\" - seem easy, but that simplicity and power require discipline to work smoothly. This brief guide provides next steps for implementing complex projects on simple and extensible foundations.",
       "authors": [ "Mark Masse" ]
     };
	 
var book2 = {
       "id": "f994d474-8fbf-4c41-9b13-9f6246e27e06",
       "title": "REST in Practice",
       "description": "REST continues to gain momentum as the best method for building web services, leaving many web architects to consider whether and how to include this approach in their SOA and SOAP-dominated world. This book offers a down-to-earth explanation of REST, with techniques and examples that show you how to design and implement integration solutions using the REST architectural style.",
       "authors": [ "Jim Webber", "Savas Parastatidis", "Ian Robinson" ]
     };
app.booklist = [];
app.booklist.push(book1);	 
app.booklist.push(book2);

	 
app.bookListResp =  {
   "response": { "status": 200, "message": "success" },
   "items": app.booklist
 };	  

//Response for LIST-Books 			  
app.get('/api/books',function(req, res){
	console.log("===================bookListResp===================");
	console.log(app.bookListResp);
	res.end(JSON.stringify(app.bookListResp));
});	


//CREATE BOOK POST URI---------------------------------------------------
var fullBookResp = {
  "response": { "status": 200, "message": "success" },
  "item": []
};

//Response for LIST-Books 			  
var getNewBookFromReq = function(req){
	//New book UUID : Generate and Add 
	var newUuid = uuid.v4();
	var newBook = freshBook();
	
	newBook.id = newUuid;
	newBook.title = req.body.title;
	newBook.description = req.body.description;
	newBook.authors = req.body.authors;
	
	return newBook;
}


app.post('/api/books',function(req, res){
	//console.log("Inside post: Add book ");
	console.log("===================Before doing anything bookListResp===================");
	console.log(app.bookListResp);
	
	var addedBook = getNewBookFromReq(req);
	
	console.log("===================newBook===================");
	console.log(addedBook);
	
	console.log("===================Before PUSHING anything bookListResp===================");
	console.log(app.bookListResp);
	fullBookResp.item.push(addedBook);
	//ADD IN Database using DAO
	//---------------
	app.booklist.push(addedBook);

	
	//console.log(fullBookResp);
	res.end(JSON.stringify(fullBookResp));
});

//UPDATE BOOK PUT URI---------------------------------------------------
app.put('/api/books/:book_id', function (req, res) {
	
	fullBookResp.item.id = book_id;
	fullBookResp.item.title = req.body.title;
	fullBookResp.item.description = req.body.description;
	fullBookResp.item.authors = req.body.authors;
	
	//UPDATE in Database using DAO
	//---------------
	console.log(fullBookResp);
	res.end(JSON.stringify(fullBookResp));   
});


//DELETE BOOK URI -------------------------------------------------------
var deleteResp = {
  "response": { "status": 200, "message": "success" }
}
app.delete('/api/books/:book_id', function (req, res) {
	
	//Delete in Database using DAO & book_id
	//---------------
	
	console.log(deleteResp);
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
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})
