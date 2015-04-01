//Reference http://codefoster.com/edison-setup
var mraa = require('mraa'); //create a reference to the built-in mraa library (which provides easy access to hardware capabilities)
var led = new mraa.Gpio(13); //setup a variable for pin 13 which also happens to be an LED on the board (how convenient)
led.dir(mraa.DIR_OUT); //tell pin 13 that it should act as an output pin for now
var state = 0; //create a variable for saving the state of the LED
var blink = function() { state = (state==1?0:1); led.write(state); setTimeout(blink,500); } //create a function that changes the state, waits 500ms, and then calls itself
blink() //start blinking
