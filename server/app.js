var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

let joins = [];

server.listen(3001, function() {
  console.log("server is running on port 3001");
});

io.on("connection", function(socket) {
  console.log(socket.id);
  socket.on("joinroom", (data) => {
    _joinRoom(socket, data);
    console.log(data);
  });
  socket.on("createroom", (data) => {
    _createRoom(socket, data);
    console.log(data);
  });
});

function _createRoom(socket, data) {
  let obj = {
    id: data,
    admin: socket.id,
    users: [socket.id],
  };

  joins.push(obj);
  socket.join(data);
  socket.emit("id", data);
  console.log(joins);
}

function _joinRoom(socket, data) {
  for (join in joins) {
    if (data == join.id) {
      socket.join(data);
    } else {
      socket.emit("error", "erreur lors de la requête");
    }
  }
}
