const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

app = express()
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('joined', (msg) => {
        console.log('name: ' + msg);
        io.emit('chat message', msg + ' joined the chat');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
  
server.listen(3000, () => {
    console.log('listening on *:3000');
}); 