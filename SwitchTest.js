var mraa = require('mraa'); 
var led = new mraa.Gpio(12); // Setup IOs
var sw = new mraa.Gpio(11); 

led.dir(mraa.DIR_OUT); // Output
sw.dir(mraa.DIR_IN);   // Input

var readSwitch  = function() { led.write(sw.read()); setTimeout(readSwitch,20); } //create a function to read switch and turn on/off led
readSwitch() //start reading switch


