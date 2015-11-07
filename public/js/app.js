// APP.JS
// This is front end script.  Requires moment.js to work
var socket = io();

socket.on('connect', function(){
    console.log('Connected to socket.io server!!!');  // Prints to browser console once ON connect.
});


// Takes the messages object and prints to browser via jQuery.
socket.on('message', function(message){

    var momentTimestamp = moment.utc(message.timestamp);  //gets message.timestamp from server?

    console.log('New browser console message: ');
    console.log('check momentTimestamp: ' + momentTimestamp);
    console.log(message.text);

    jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ':</strong> ' + message.text + '</p>');


});



// Handles submitting of new message
var $form = jQuery('#message-form');   // only use $ to say it is jquer element
//console.log($form);

//var now = moment();
//var timeStamp = now.format('h:mm a');

$form.on('submit', function(event){
    event.preventDefault();

    socket.emit('message', {
            text: $form.find('input[name=message]').val()
                  });

    $form.find('input[name=message]').val('');  //delete input box after submit
});
