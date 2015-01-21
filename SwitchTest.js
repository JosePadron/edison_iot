
var mraa = require('mraa'); //create a reference to the built-in mraa library (which provides easy access to hardware capabilities)
var led = new mraa.Gpio(12); //setup a variable for pin 13 which also happens to be an LED on the board (how convenient)
var sw = new mraa.Gpio(11); // Setup input
led.dir(mraa.DIR_OUT); //tell pin 13 that it should act as an output pin for now
sw.dir(mraa.DIR_IN); //setup switch as input

var readSwitch  = function() { led.write(sw.read()); setTimeout(readSwitch,20); } //create a function to read switch and turn on/off led
readSwitch() //start reading switch


