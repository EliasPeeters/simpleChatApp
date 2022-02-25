const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
let credentialsLoader = require('./getCredentials');
let mysqlSetup = require('./mysqlSetup');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

app = express()
app.set('view engine', 'ejs');
credentials = credentialsLoader.getCredentials();
connection = mysqlSetup.getConnection();

urlencodedparser = bodyparser.urlencoded({extended: false});
app.use(express.urlencoded());
app.use(cookieParser())

const server = http.createServer(app);
const io = new Server(server);

loggedInUsers = []


// routes

const mainRoute = require('./routes/main');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');



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