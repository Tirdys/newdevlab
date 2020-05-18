var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

let joins = [];
server.listen(3001, function() {
  console.log("server is running on port 3001");
});

io.on("connection", function(socket) {
  console.log(socket.id);
  socket.on('name', (data)=>{
    socket.pseudo= data
  });
  socket.on("joinroom", (data) => {
    _joinRoom(socket, data);
  });
  socket.on("createroom", (data) => {
    _createRoom(socket, data);
  });
    socket.on('pickid', function(data) {
      socket.emit('pid', data);
        socket.broadcast.emit('pid', data)
    });
    socket.on('banid', function(data) {
      socket.emit('bid', data);
        socket.broadcast.emit('bid', data)
    });
    socket.on('changeplayer', function(data) {
        socket.broadcast.emit('player', data)
    });
    socket.on('nbturn', function(data) {
      socket.broadcast.emit('turn', data)
    });
    socket.on('timer', function(data) {
      socket.emit('time', data);
      socket.broadcast.emit('time',data)
    });
  socket.on('readyB', function(data) {
    socket.broadcast.emit('readB', data)
  });
  socket.on('readyA', function(data) {
    socket.broadcast.emit('readA', data)
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
   let listlenght = joins.length;
  for(let i = 0; i < listlenght; i++) {
    if (data == joins[i].id) {
      socket.join(data);
      socket.emit('room',data);
    } else {
      socket.emit("message",{mes:"il n'y a pas de room avec cette id"});
    }
  }
}
