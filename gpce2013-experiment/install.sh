#!/bin/bash

echo 'install Kevoree JS demo';
echo 'Prerequis : node, npm';

if [ -d "kev-web-editor" ]
then
    echo "Directory kev-web-editor exits."
else
    echo "Download Kevoree Web Editor"
	git clone git://github.com/maxleiko/kev-web-editor.git
fi

if [ -f kevJavaEditor.jar ]
then
    echo "File kevJavaEditor.jar exists."	
else
	echo "Download Kevoree"
	curl http://maven.kevoree.org/snapshots/org/kevoree/tools/org.kevoree.tools.ui.editor.standalone/2.0.0-SNAPSHOT/org.kevoree.tools.ui.editor.standalone-2.0.0-20130612.092237-327.jar > kevJavaEditor.jar
fi	

cd WebSocketServer
npm install

cd ../kev-web-editor
npm install

echo "Install done !"