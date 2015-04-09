/*global Transr, io*/
var socket = io();

// listen
// socket.on('config', function(data){
//   console.log("Connected to sensortag, fps =", data.fps);
//   socket.on('accelero', function(ev){
//     Transr.rotate({
//       id:"accelero",
//       el:document.getElementById('mover'),
//       x: Math.atan(ev.data.x/(Math.sqrt(Math.pow(ev.data.y,2) + Math.pow(ev.data.z,2)))) +'rad',
//       y: Math.atan(ev.data.y/(Math.sqrt(Math.pow(ev.data.x,2) + Math.pow(ev.data.z,2)))) +'rad',
//       z: Math.atan((Math.sqrt(Math.pow(ev.data.x,2) + Math.pow(ev.data.y,2)))/ev.data.z) +'rad',
//       duration: (1/data.fps) + "s",
//       timingFunction:"ease-in-out"
//     });
//   });
// });

socket.on('config', function(data){
  console.log("Connected to sensortag, fps =", data.fps);
  
  
  socket.on('accelero', function(ev){
    var x = ev.data.x;
    var y = ev.data.y;
    var z = ev.data.z;
    var f = data.fps;//每秒十個數據，
    // document.getElementById('moverX').innerHTML = "<li>" + 0.5*x*(f^2) + "</li>";
    // document.getElementById('moverY').innerHTML = "<li>" + 0.5*y*(f^2) + "</li>";
    // document.getElementById('moverZ').innerHTML += "<li>" + 0.5*z*(f^2) + "</li>";
    document.getElementById('moverX').innerHTML += "<li>" + 4*x + "</li>";
    document.getElementById('moverY').innerHTML += "<li>" + 4*y + "</li>";
    document.getElementById('moverZ').innerHTML += "<li>" + 4*z + "</li>";
    // document.getElementById('timer').innerHTML = "fps="+f; 

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');


      context.beginPath();
      context.moveTo(100, 0);
      context.lineTo(100, 100*4*x);
      context.stroke();
  });



});
