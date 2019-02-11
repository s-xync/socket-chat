const express = require("express");
const socket = require("socket.io");

const app = express();

const PORT = 4000;

var server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static("public"));

// socket setup --> which server to use
var io = socket(server);

/**
 * emit = send to all clients
 * broadcast = send to other clients except for the original client
 */

io.on("connection", socket => {
  console.log("made socket connection", socket.id);
  socket.on("chat", data => {
    // to everyone
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    // to everyone except for self
    socket.broadcast.emit("typing", data);
  });
});
