//*** SERVER.JS
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();  //just call express no args
var http = require('http').Server(app);  //Anything the express app listens to the server should also.

 app.use(express.static(__dirname + '/public'));

 http.listen(PORT, function(){
   console.log('Server started!');
 })






























//************************
