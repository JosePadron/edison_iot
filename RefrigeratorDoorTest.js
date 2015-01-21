// Reference http://www.instructables.com/id/Intel-IoT-Edison-web-controlled-LED/step3/The-nodejs-part/

var mraa = require('mraa');
var led = new mraa.Gpio(12); // Setup IO
var http = require('http');
var url = require('url');
var greenBean = require("green-bean");
var doorState = 0

led.dir(mraa.DIR_OUT); // Output

function UpdateLed()
{
   led.write(doorState);
}

function SaveDoorState(value)
{
   doorState = value['doorState'];
}

greenBean.connect("refrigerator", function(refrigerator)
   {
      refrigerator.doorState.read(function (value)
         {
            console.log("door state is:", value);
            SaveDoorState(value);
            UpdateLed();
         });

      refrigerator.doorState.subscribe(function (value)
         {
            console.log("door state changed:", value);
            SaveDoorState(value);
            UpdateLed();
         });
   });

function sendResponse(doorState, remoteIP, response)
{
   console.log('\nRequest to read Door State');
   console.log('from ' + remoteIP);
   response.writeHead(200,{ 'Content-Type': 'text/html' });
   response.write('<!DOCTYPE html><html lang="en"><head>');
   response.write('<meta charset="utf-8">');
   response.write('<meta http-equiv="refresh" content="30" />');
   response.write('<title>Refrigerator Door State</title>');
   if(!doorState)
   {
      response.write('<style>body{background-color:black;color:white;}</style>');
   }
   response.write('</head>');
   response.write('<body><h1>The Door is ' + (doorState ? 'Open':'Close'));
   response.write('</h1>');
   response.write('</body></html>');
   response.end();
}

function processRequest(request, response)
{
   "use strict";
   var remoteIP = request.headers['X-Forwarded-For'] == undefined ? request.connection.remoteAddress : request.headers['X-Forwarded-For'];
   sendResponse(doorState, remoteIP, response);
}

http.createServer(processRequest).listen(8080);

console.log("Server running at port 8080");
