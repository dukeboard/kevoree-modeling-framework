var fs = require('fs');
var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:8080');
var serverUrl = 'ws://127.0.0.1:8080';
var conn = new WebSocket(serverUrl);
conn.on('open', function(){
    console.log("WsClient");
	conn.on('message', function(data){
	     console.log("rec Model :-)"+data); 
	});
	fs.readFile('modelAll.json', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  conn.send(data);
	});
});


 
