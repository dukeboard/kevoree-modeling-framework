var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();


  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });
  app.use('/lib', express.static(__dirname + '/lib'));
  app.use('/css', express.static(__dirname + '/css'));
  app.get('/current', function (req, res) {
    res.sendfile(__dirname + '/modelAll.json');
  });

var server = http.createServer(app);
server.listen(8080);

var clients = [];
var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  clients.push(ws);
  ws.on('close', function() {
	  clients.splice(clients.indexOf(ws), 1);
  });
  ws.on('message',function(data, flags){
	  for(var i=0;i<clients.length;i++){
		  if(clients[i] != ws){
  	  		clients[i].send(data);
		  }
	  }
  });
});

console.log("WS Server running, url : ws://localhost:8080");