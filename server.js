//*** SERVER.JS
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();  //just call express no args
var http = require('http').Server(app);  //Anything the express app listens to the server should also.
var io = require('socket.io')(http);

    app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){        //listen for events

    console.log('User connected via socket.io!');

    socket.on('message', function(message){
        console.log('Message received: ' + message.text);

        //socket.broadcast.emit('message', message);  sends to everyone EXCEPT who sent it.
        io.emit('message', message);
    });

    socket.emit('message', {    //only get one arg.  Use an object to hold a bunch of stuff
        text: 'Welcome to the chat application'
    });

});


http.listen(PORT, function(){
   console.log('Server started!');
});

































//************************
