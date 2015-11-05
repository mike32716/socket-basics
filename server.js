//*** SERVER.JS
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();  //just call express no args
var http = require('http').Server(app);  //Anything the express app listens to the server should also.
var io = require('socket.io')(http);

 app.use(express.static(__dirname + '/public'));

io.on('connection', function(){        //listen for events
  console.log('User connected via socket.io!');
});


http.listen(PORT, function(){
   console.log('Server started!');
});

































//************************
