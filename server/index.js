const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const shortId = require('shortid');

const io = new Server(server, { cors: { origin: '*' } });

const rooms = [];

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/src/index.html');
});

app.post('/login', (req, res) => {
	res.sendStatus(200);
});

io.on('connection', (socket) => {
	console.log('a user connected');

	var currentRoom = null;

	socket.on('disconnect', () => {

		// If user actively was on room
		if (currentRoom) {
			socket.to(currentRoom.id).emit(socket.username + " has left");
		}
	});

	socket.broadcast.emit('hi');

	// User events
	socket.on("set username", function (data) {
		socket.username = data.username;
	})


	// Room events
	socket.on('join room', (data) => {
		currentRoom = data.room.id;

		socket.join(data.room);
	})

	socket.on("change room", function(data){

		console.log("room changed", data);
		
		// Leave current room
		socket.leave(currentRoom);

		currentRoom = data.room.id;

		// Join new room
		socket.join(currentRoom);
	});

	socket.on('create room', (data) => {
		roomId = shortId.generate();

		rooms.push({ id: roomId, name: data.name });

		console.log('New room created. Code => ', { id: roomId, name: data.name });

		io.emit('room created', { rooms: rooms });

	})

	// Message events
	socket.on('chat message', (data) => {
		io.emit('get message', data);
	});

	
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});