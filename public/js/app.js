// APP.JS
// This is front end script.  Requires moment.js to work
var name = getQueryVariable('name') || "Anonymous Coward";  //users Andrews functin to get params
var room = getQueryVariable('room');  // if not defined then use name Anonymous
var socket = io();

console.log('browserconsole: ' + name + ' joined ' + room);

// update room title heading
jQuery('.room-title').text(room).css("color", "blue");




socket.on('connect', function(){
    console.log('Connected to socket.io server!!!');  // Prints to browser console once ON connect.
   
    socket.emit('joinRoom', {
            name: name, 
            room: room
        });

});




// Takes the messages object and prints to browser via jQuery.
socket.on('message', function(message){

    var momentTimestamp = moment.utc(message.timestamp);  //gets message.timestamp from server?
    var $messages = jQuery('.messages');  //Gets the message from the user input
    var $message  = jQuery('<li class="list-group-item"></li>');  //to format the message

    console.log('New browser console message: ');
    console.log('check momentTimestamp: ' + momentTimestamp);
    console.log(message.text);
    

    $message.append('<p><strong><span id= "messagename">' + message.name +  '</span><span id= "thetimestamp">  @' +  momentTimestamp.local().format('h:mm a') + '</span></strong></p>');
    //jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ':</strong> ' + message.text + '</p>');
    $message.append('<p>' + message.text + '</p>');
  
    $messages.append($message);

});





// Handles submitting of new message
var $form = jQuery('#message-form');   // only use $ to say it is jquer element

//console.log($form);


$form.on('submit', function(event){
    event.preventDefault();

    socket.emit('message', {
            name: name,
            text: $form.find('input[name=message]').val()
                  });

    $form.find('input[name=message]').val('').focus();  //delete input box after submit and give focus
});

