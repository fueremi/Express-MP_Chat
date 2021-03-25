const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');
const { userJoin, currentUser, userLeave, roomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'MP Bot'

// Run when client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, chatRoom }) => {

        const user = userJoin(socket.id, username, chatRoom);
        socket.join(user.chatRoom);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to MP Chat!'))

        // Broadcast when a user connects
        socket.broadcast.to(user.chatRoom).emit('message', formatMessage(botName, `${user.username} has join the chat`));

        // Send users and chatRoom info
        io.to(user.chatRoom).emit('roomUsers', {
            chatRoom: user.chatRoom,
            users: roomUsers(user.chatRoom)
        })
    })

    // Listen for chatMessage 
    socket.on('chatMessage', (msg) => {
        const user = currentUser(socket.id);

        console.log(msg);
        io.to(user.chatRoom).emit('message', formatMessage(user.username, msg))
    })

    // Broadcast when a user disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.chatRoom).emit('message', formatMessage(botName, `${user.username} has left the chat!`));
        }
    });
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));