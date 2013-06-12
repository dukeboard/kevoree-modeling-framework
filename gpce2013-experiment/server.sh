#!/bin/bash

cd WebSocketServer
open http://localhost:8080

if [ -n "which node" ];
	then
		node wssrv.js
fi

if [ -n "which nodejs" ];
	then
		nodejs wssrv.js
fi



