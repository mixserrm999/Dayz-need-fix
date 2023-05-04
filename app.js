const express = require('express');
const app = express();
// For now we server the client with the service.
app.use('/', express.static(__dirname + '/src/client'));


const serv = require('http').Server(app);
const portserv = 2000
const io = require('socket.io')(serv, {});
let { Player } = require('./src/server/Player')
let { randomlyGeneratePlayers } = require('./src/server/spawnPlayer');

let SOCKET_LIST = [];

io.sockets.on('connection', function (socket) {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  // Handler of actions that initiate by Player
  Player.onConnect(socket);

  // TODO: Fix chat
  // socket.on('sendMsgToServer', function (data) {
  //   let playerName = ('' + socket.id).slice(2, 7);
  //   for (let i in SOCKET_LIST) {
  //     SOCKET_LIST[i].emit('addToChat', '<b>' + playerName + '</b>: ' + data);
  //   }
  // });

  socket.on('connect', function () {
    console.log('Connected to server');
    randomlyGeneratePlayers(10);
  });
  
  

  // When disconnected delete list entry
  socket.on('disconnect', function () {
    delete SOCKET_LIST[socket.id];
    Player.onDisconnect(socket);
  });
});

// Looping
setInterval(function () {
  let pack = Player.update()

  for (let i in SOCKET_LIST) {
    let socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }
}, 1000 / 30)

serv.listen(portserv);
console.log('[>] Service started in PORT: ' + portserv)
