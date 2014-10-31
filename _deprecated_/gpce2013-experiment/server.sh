#!/bin/bash

cd WebSocketServer

if [ -n "which xdg-open" ];
	then
		open http://localhost:8080 
	else
		xdg-open http://localhost:8080
fi

if [ -n "which node" ];
	then
		node wssrv.js
fi

if [ -n "which nodejs" ];
	then
		nodejs wssrv.js
fi



