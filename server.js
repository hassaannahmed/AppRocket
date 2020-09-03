const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();

const PORT = process.env.PORT || 3000;

const router = require('./routes/api/router');

// Socket.io
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

//app.listen(PORT, () => console.log(`Server running on ${PORT}`));
