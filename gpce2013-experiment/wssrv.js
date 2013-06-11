var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/current', function (req, res) {
  res.sendfile(__dirname + '/modelAll.json');
});

io.sockets.on('connection', function (socket) {
  socket.on('model', function (data) {
    console.log(data);
  });
});

console.log("WS Server running, url : ws://localhost:8080");