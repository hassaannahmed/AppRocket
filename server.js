const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/router/', require('./routes/api/router'));
app.use('/api/users/', require('./routes/api/users'));
app.use('/api/conversations/', require('./routes/api/messages'));

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  socket.on('joinRoom', (data) => {
    const { userId, room } = data;
    socket.join(room);

    socket.broadcast.to(room).emit('servermessage', 'User Connected');
  });
  console.log('a user connected');

  socket.on('chatMessage', (data) => {
    console.log('got data');
    console.log(data);
    const { id, conversationId, msgText } = data;
    io.to(conversationId).emit('message', data);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
