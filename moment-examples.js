// MOMENT-EXAMPLES.JS

var moment = require('moment');

var now = moment();


//console.log(now);  // seconds from 12:00am 1/1/1970

//now.subtract(1, 'year');  //subtracts 1 year from now

//now.subtract(5, 'hour');

console.log( now.format() );

console.log( now.format('MMM Do YYYY, h:mm a') );  //Oct 5th 2015, 6:45pm

//this gives Unix time.  London seconds since 1-1-1970
console.log( now.format('X') );  //seconds
console.log( now.valueOf());  //gives number and not string like others.
console.log( now.format('x') );  //milliseconds for JavaScript

// This does it longhand
var myTime = Math.round(new Date().getTime()/1000.0);
console.log('The time is: ' + myTime );


var timestamp = 1444247486704;
var timestampMoment = moment.utc(timestamp);  //accessing moments UTC property
console.log('Converted time is: ' + timestampMoment.local().format('h:mm a') ) ;

var mikeStamp = now.format('X');
console.log(mikeStamp);
