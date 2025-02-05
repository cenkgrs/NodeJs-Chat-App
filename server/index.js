const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: '*' } });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.broadcast.emit('hi');

  socket.on('chat message', (data) => {
    console.log(data);
    io.emit('get message', data);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});