const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
let credentialsLoader = require('./getCredentials');
let mysqlSetup = require('./mysqlSetup');

app = express()
app.set('view engine', 'ejs');
credentials = credentialsLoader.getCredentials();
connection = mysqlSetup.getConnection();


const server = http.createServer(app);
const io = new Server(server);

app.get('/', async (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    let messages = await connection.asyncquery('SELECT * FROM chat');
    console.log(messages)

    res.render('main', {messages})
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        let query = connection.createQueryStringFromObject({table: 'chat', message: msg});
        connection.asyncquery(query);
        
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