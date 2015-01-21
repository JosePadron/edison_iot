// Reference http://www.instructables.com/id/Intel-IoT-Edison-web-controlled-LED/step3/The-nodejs-part/

var mraa = require('mraa');
var led = new mraa.Gpio(12); // Setup IO
var http = require('http');
var url = require('url');
var fs = require('fs');
var tempFile = "/tmp/led.txt";

led.dir(mraa.DIR_OUT); // Output
function sendResponse(ledOn, remoteIP, response)
{
   if(remoteIP != null)
   {
      console.log('\nRequest to switch LED ' + (ledOn ? 'On':'Off'));
      console.log('from ' + remoteIP);
      led.write(ledOn ? 1 : 0);
      var fileStream = fs.createWriteStream(tempFile);
      fileStream.write(ledOn + "\n" + remoteIP + "\nOK\n");
      fileStream.end();

      response.writeHead(302,
         {
            'Location': '/'
         });
      response.end();
   }
   else
   {
      response.writeHead(200,{'Content-Type': 'text/html' });
      response.write('<!DOCTYPE html><html lang="en"><head>');
      response.write('<meta charset="utf-8">');
      response.write('<meta http-equiv="refresh" content="30" />');
      response.write('<title>LED switch</title>');
      if(!ledOn)
      {
         response.write('<style>body{background-color:black;color:white;}</style>');
      }
      response.write('</head>');

      response.write('<body><h1>LED is now ' + (ledOn ? 'On':'Off'));

      response.write('</h1>');
      if(ledOn)
      {
         response.write('<a href="/off">Switch off!</a>');
      }
      else
      {
         response.write('<a href="/on">Switch on!</a>');
      }

      response.write('</body></html>');

      response.end();
   }
}

function processRequest(request, response)
{
   "use strict";
   var pathName = url.parse(request.url).pathname;
   var remoteIP = request.headers['X-Forwarded-For'] == undefined ? request.connection.remoteAddress : request.headers['X-Forwarded-For'];

   if(pathName == "/on")
   {
      sendResponse(true, remoteIP, response);
   }
   else if(pathName == "/off")
   {
      sendResponse(false, remoteIP, response);
   }
   else if(pathName == "/")
   {
   fs.exists(tempFile, function (exists){
         if (exists)
         {
            fs.readFile(tempFile, function(err,data)
               {
                  if (!err)
                  {
                     console.log('\nStored data:\n' + data);
                     var storedData = data.toString().split("\n");
                     sendResponse ((storedData[0] == "true"), null, response);
                  }
                  else
                  {
                     console.log(err);
                  }
               });
         }
         else
         {
            sendResponse (false, null, response);
         }
      });
}
else
{
   response.end();
}
}

http.createServer(processRequest).listen(8080);

console.log("Server running at port 8080");
