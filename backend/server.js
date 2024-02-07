const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

const expres_server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})

const ioServer = require('socket.io')(expres_server)

ioServer.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`)
    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
        console.log('message: ' + msg)
    })
})

// server.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}/`)
// })