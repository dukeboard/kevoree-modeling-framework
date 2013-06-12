#!/bin/bash

cd kev-web-editor
open http://localhost:3000/?listen=localhost:8080

if [ -n "which node" ];
	then
		node app.js
fi

if [ -n "which nodejs" ];
	then
		nodejs app.js
fi


