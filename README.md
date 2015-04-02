#Welcome to the edison_iot wiki!

###Setup Steps:

1- Download Intel software: https://software.intel.com/en-us/iot/getting-started

2- Download and install Edison operating system (Yocto complete image): http://www.intel.com/support/edison/sb/CS-035286.htm#1

3- Setup Wifi Connection: http://www.intel.com/support/edison/sb/CS-035342.htm

4- Configure opkg:

    a. opkg install git

    b. Note: If you get the error Unknown package 'git', add this repo to the feeds (vi /etc/opkg/base-feeds.conf)

      src all http://iotdk.intel.com/repos/1.1/iotdk/all

      src x86 http://iotdk.intel.com/repos/1.1/iotdk/x86

      src i586 http://iotdk.intel.com/repos/1.1/iotdk/i586
 
    c. opkg update
  
5- opkg install libusb-1.0-dev

6- Install GreenBean package: https://github.com/GEMakers/green-bean

7- Connect GreenBean to the Arduino Breakout Kit. Move sw1 towards the USB port.

8- Run HidTest.js

9- If the GreenBean HID information is displayed, you are good to go!

#Examples:
###1- HidTest.js 

Displays all the HID devices conncected to the Edison board.

    Connection: 
        USB-> GreenBean board

###2- LedBlink.js

Blinks LED (GPIO13) on the Arduino Breakout Kit every 500 ms.

###3- SwitchTest.js

Turns on/off LED (GPIO12) based on the switch (GPIO11) state. 

    Connections: 

        GPIO12 -> LED -> 220 ohm -> Gnd
        
        5 VDC -> TouchSensor VCC
        
        Gnd -> TouchSensor GND
        
        GPIO11-> TouchSensor SIG
      
  
![TouchSensor](/media/IMG_20150401_180834.jpg?raw=true "Touch Sensor")

![All Connections](/media/IMG_20150401_180553.jpg?raw=true "All Connections")

####Switch Test Video: https://github.com/elrafapadron/edison_iot/blob/master/media/VID_20150401_180515.mp4

###4- WebLedTest.js

Turns on/off LED from a web page. Use ifconfig to get ip address before running script.

    Connection: 

        GPIO12 -> LED -> 220 ohm -> Gnd

###5- RefrigeratorDoorTest.js

Turns on/off LED based on the door status. Door status is displayed after refreshing the web page. Use ifconfig to get ip address before running script.

    Connections: 

        GPIO12 -> LED -> 220 ohm -> Gnd
        USB -> GreenBean board -> Refrigerator

