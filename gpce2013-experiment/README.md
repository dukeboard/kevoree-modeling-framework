#Kevoree JS collaborative editor demo

### 1.requirements
		
		nodeJS (node,npm)
		


### 2.install

	git clone git@github.com:dukeboard/kevoree-modeling-framework.git
	cd gpce2013-experiment
	sh install.sh
	
### 3.start WebSocketServer

	sh server.sh
	
A browser should be open on the following adress

	http://localhost:8080
	
This simple Web representation is synchronized with the WS server.
	
### 4.start JavaEditor

	sh javaeditor.sh
	
Sould open the plain java editor

Click on the icon : (Top right, WSSync) , and leave the address as this. Now the editor is sychronized with the server.

### 5.push a first model

	sh pushModel.sh
	
The simple WebPage and the Java editor reload their content with the new model.

### 6.start WebEditor

	sh webeditor.sh
	
Go to File > Listen to : enter address localhost:8080 and click ok. Now the WebEditor is synchronized also with the server

(repeat the step 5 to get convince ;-)

### 7.push

Do a modification in Java editor (Add a node for instance)

Click on the icon : WSPush

The Kevoree Web Editor, Java Editor, and the simple WebPage is synchronized on the same model.

Enjoy :-)
Kevoree Team