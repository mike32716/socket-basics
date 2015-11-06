// APP>JS

var socket = io();

socket.on('connect', function(){
    console.log('Connected to socket.io server!!!');
});


socket.on('message', function(message){
    console.log('New message:');
    console.log(message.text);

    jQuery('.messages').append('<p>' + message.text + '</p>');
});


// Handles submitting of new message
var $form = jQuery('#message-form');   // only use $ to say it is jquer element
//console.log($form);

$form.on('submit', function(event){
    event.preventDefault();

    socket.emit('message', {
            text: $form.find('input[name=message]').val()
              });

    $form.find('input[name=message]').val('');  //delete input box after submit
});
