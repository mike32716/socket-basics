//*** SERVER.JS
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();  //just call express no args
var http = require('http').Server(app);  //Anything the express app listens to the server should also.
var io = require('socket.io')(http);

var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};  //unique socket id for individual and room



// Sends current users to provided socket
function sendCurrentUsers(socket){
    var info = clientInfo[socket.id];
    var users = [];

    if(typeof info === 'undefined'){ return }

    Object.keys(clientInfo).forEach(function(socketId){
        var userInfo = clientInfo[socketId];
        if (info.room === userInfo.room){
            users.push(userInfo.name);
        }
    });
    
    socket.emit('message', {
        name: 'System',
        text: 'Current users: ' + users.join(', '),
        timestamp: moment().valueOf()
        
    });
    
    
}



io.on('connection', function(socket){        //listen for events
    console.log('User connected via socket.io!');



    socket.on('disconnect', function(){
    
    console.log('A USER is disconnecting form a room.');

        var userData = clientInfo[socket.id];  // unique user id assigned by socket.io


        if (typeof userData !== 'undefined') {

            console.log('A user has left a room!!!!!!');
            
            socket.leave(userData.room);

            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left the room!',
                timestamp: moment().valueOf()
                
            });

            delete clientInfo[socket.id];
        }
    });



    
    socket.on('joinRoom', function(req){   //code to handle room request
        
        clientInfo[socket.id] = req;  //uses empty object created above.

        socket.join(req.room);

        socket.broadcast.to(req.room).emit('message',{ 
            name: 'System',
            text: req.name + ' has joined the room!',
            timestamp: moment().valueOf()
        });

    });





    socket.on('message', function(message) {
        console.log('Message received: '  + message.text);
        //check to see if user is asking for list of users in a room.
        if(message.text === '@currentUsers'){
        
            sendCurrentUsers(socket);
        
        } else {

            message.timestamp =  moment().valueOf();  //1444247486704;
            //socket.broadcast.emit('message', message);  sends to everyone EXCEPT who sent it.
            io.to(clientInfo[socket.id].room).emit('message', message);  //gets timestamp and messge from sender and sends out

        }
       
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

//*************************************************************
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//**********************************************************************8


//*****************************************
http.listen(PORT, function(){
   console.log('Server started!');
});




















//************************
