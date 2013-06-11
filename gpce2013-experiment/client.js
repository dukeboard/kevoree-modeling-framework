var io = require('socket.io-client');
var fs = require('fs');

var serverUrl = 'ws://localhost:8080/model';
var conn = io.connect(serverUrl);
conn.on('connect', function(){
    console.log("WsClient");
	conn.on('broadcastModel', function(p){
	     console.log("rec Model :-)"); 
	});
	
	fs.readFile('modelAll.json', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  conn.emit('model', data);
	});

});


 
