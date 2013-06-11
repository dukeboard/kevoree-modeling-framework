var express = require('express');
var app = express();

var server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use('/lib', express.static(__dirname + '/lib'));

app.use('/css', express.static(__dirname + '/css'));

app.get('/current', function (req, res) {
  res.sendfile(__dirname + '/modelAll.json');
});

var broadcastModel = io.of("/model").on('connection', function (socket) {
  socket.on('model', function (data) {
	console.log("forward model to all");
  	broadcastModel.emit("broadcastModel",data);
  });
});

console.log("WS Server running, url : ws://localhost:8080");