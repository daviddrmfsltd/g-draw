// Config
var config = {
  fps: 10
};


    

// Main sensor loop
var SensorTag = require('sensortag');
var util = require('util');
var sensorDiscovered = false;
function findSensor() {
  console.log('Finding sensor..');
  if ( !sensorDiscovered ) {
    SensorTag.discover(function(sensorTag){
      if ( !sensorDiscovered ) {
        sensorDiscovered=true;
        console.log('Connecting to sensor..');
        //console.log(util.inspect(st, { showHidden: true, depth: null }));
        sensorTag.connect(function(){
          console.log('Enabling accelerometer..');
          sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.enableAccelerometer(function(){
              console.log('Accelerometer ready');
              sensorTag.setAccelerometerPeriod(100, function(){
                sensorTag.notifyAccelerometer(function(){
                  sensorTag.on('accelerometerChange', function(x,y,z){
                    console.log('(x,y,z)=(' + x,y,z + ')');
                    io.emit('accelero', {
                      for:'clients',
                      data: {x:x, y:y, z:z}
                    });
                  });
                });
              });
            });
          });
        });
      }
    });
    setTimeout(findSensor,2000);
  }
}


// Express
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/client'));

io.on('connection', function(socket){
  socket.emit('config', config);
});

http.listen(8080, function(){
  console.log('Client available on http://localhost:8080/');
  findSensor();
});