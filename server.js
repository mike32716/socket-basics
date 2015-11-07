//*** SERVER.JS
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();  //just call express no args
var http = require('http').Server(app);  //Anything the express app listens to the server should also.
var io = require('socket.io')(http);

var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};  //unique socket id for individual and room



io.on('connection', function(socket){        //listen for events
    console.log('User connected via socket.io!');

    
    socket.on('joinRoom', function(req){   //code to handle room request
        
        clientInfo[socket.id] = req;

        socket.join(req.room);

        socket.broadcast.to(req.room).emit('message',{ 
            name: 'System',
            text: req.name + ' has joined the room!',
            timestamp: moment().valueOf()
        });

    });



    socket.on('message', function(message) {
        console.log('Message received: '  + message.text);

        message.timestamp =  moment().valueOf();  //1444247486704;
        //socket.broadcast.emit('message', message);  sends to everyone EXCEPT who sent it.
        io.to(clientInfo[socket.id].room).emit('message', message);  //gets timestamp and messge from sender and sends out
    });



   //timestamp property = javascript timestamp in milliseconds valueOf!!
   //var timeStamp = now.format('MMM Do YYYY, h:mm a');
    //This is the initial message and then it does nothing else.
    socket.emit('message', {    //only get one arg.  Use an object to hold a bunch of stuff
        name: 'System',
        text: 'Welcome to the chat application!',
        timestamp: moment().valueOf()
    });





});


//*****************************************
http.listen(PORT, function(){
   console.log('Server started!');
});

































//************************
