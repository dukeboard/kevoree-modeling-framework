#!/bin/bash

cd WebSocketServer

if [ -n "which node" ];
	then
		node client.js
fi

if [ -n "which nodejs" ];
	then
		nodejs client.js
fi
