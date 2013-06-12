#Kevoree JS collaborative editor demo

### 1.Requirements
You need to have nodeJS installed on your machine. Version 0.10.10 or higher is recommended.
Please check that the command `node` is available in a Terminal console. 

To check the version of Node on Linux, type:

	nodejs --version

		
If you are running a linux, you can install Node as follows:

	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs

### 2.Download and Install

	git clone https://github.com/dukeboard/kevoree-modeling-framework.git
	cd gpce2013-experiment
	sh install.sh
	
### 3.Start WebSocketServer
This WebSocket server creates a local broadcaster between Kevoree Model Editors (Desktop or Web).
Run:

	sh server.sh
	
A browser should open (if not, open it) at the following address

	http://localhost:8080
	
This simple Web representation is synchronized with the WS server.
	
### 4.Start a Desktop Kevoree Editor

	sh javaeditor.sh
	
Should open the plain Java editor

Click on the icon : (Top right, WSSync) , and leave the address as this. Now the editor is sychronized with the server.

### 5.Push a first model to the editors

	sh pushModel.sh
	
The simple WebPage and the Java editor reload their content with the new model.

### 6.Start a WebEditor

	sh webeditor.sh
	
A browser should open (if not, open it) at the following address

	http://localhost:3000
	
Go to File > Listen to : enter address localhost:8080 and click ok. Now the WebEditor is synchronized also with the server

(repeat the step 5 to get convinced that you're connected ;-) )

### 7.Collaborate

Do a modification in Java editor (Add a node for instance)

Click on the icon : WSPush

The Kevoree Web Editor, Java Editor, and the simple WebPage are synchronized on the same model.

Enjoy :-)
Kevoree Team
