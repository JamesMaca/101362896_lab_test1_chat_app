const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');

const DB_CONNECTION = 'mongodb+srv://jjmm:leafs@cluster0.kzivlod.mongodb.net/comp3133FULLSTACK2?retryWrites=true&w=majority';

mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Server, " + DB_CONNECTION);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

app.use(cors());
app.use(express.json());
app.use(userRoutes);
// app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 4040;

// Socket.io connections
io.on('connection', (socket) => {
    console.log(`New user connected : ${socket.id}`);
    socket.emit('socketId', socket.id);

  socket.on('disconnect', () => {
    console.log(`User disconnected : ${socket.id}`);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});