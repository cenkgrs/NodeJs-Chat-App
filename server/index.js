const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const shortId = require('shortid');

const io = new Server(server, { cors: { origin: '*' } });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

app.post('/login', (req, res) => {
	res.sendStatus(200);
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

  socket.on('create room', (data) => {
    socket.id = shortId.generate();
    console.log('New room created. Code => ', {socket_id: socket.id, name: "Oda1"});

    io.emit('room created', socket.id);

  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});