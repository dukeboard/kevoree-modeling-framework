#!/bin/bash

cd kev-web-editor

if [ -n "which xdg-open" ];
	then
		open http://localhost:3000/?listen=localhost:8080
	else
		xdg-open http://localhost:3000/?listen=localhost:8080
fi

if [ -n "which node" ];
	then
		node app.js
fi

if [ -n "which nodejs" ];
	then
		nodejs app.js
fi


