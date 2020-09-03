const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/router/', require('./routes/api/router'));
app.use('/api/users/', require('./routes/api/users'));

app.use(express.static(__dirname));

// Socket.io
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('hello', 'emitted message');

  socket.emit('hello', 'emitted message');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
