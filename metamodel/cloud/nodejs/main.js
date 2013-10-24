var model = require('../target/js/org.kevoree.modeling.sample.cloud.js.merged.js');

var saver = new model.org.cloud.serializer.JSONModelSerializer();
var loader = new model.org.cloud.loader.JSONModelLoader();
var cloner = new model.org.cloud.cloner.DefaultModelCloner();
var compare = new model.org.cloud.compare.DefaultModelCompare();
var event2trace = new model.org.kevoree.modeling.api.trace.Event2Trace(compare);
var factory = new model.org.cloud.impl.DefaultCloudFactory();
var ActionType = model.org.kevoree.modeling.api.util.ActionType;

//Just define a deep cloud model
var cloud = factory.createCloud();
for(var nodeI=0;nodeI<5;nodeI++){
    var newNode = factory.createNode();
    newNode.id = "Node_"+nodeI;
    cloud.addNodes(newNode);
    for(var softI=0;softI<3;softI++){
       var newSoft = factory.createSoftware();
       newSoft.name = "Soft_"+nodeI+"_"+softI;
       newNode.addSoftwares(newSoft);
       newSoft.data.add("Yop");
       newSoft.data.add("Yop2");
        newSoft.data.add("Yop3");
        newSoft.data.add("Yo p3");
    }
}

//save in JSON
var savedModel = saver.serialize(cloud);

var loadedModel = loader.loadModelFromString(savedModel).get(0);
console.log("After Load");

var clonedModel = cloner.clone(loadedModel);
var savedModel2 = saver.serialize(loadedModel);
console.log(savedModel2);

console.log("After Clone");


/*
String.prototype.repeat = function( num ){return new Array( num + 1 ).join(this);}
function prettyPrint(indice){
    indice = typeof indice !== 'undefined' ? indice : 0;
    var children = this.containedElementsList();    
    console.log("--".repeat(indice)+this.metaClassName())
    this.containedElementsList().array.forEach(function(entry) {
        entry.prettyPrint(indice+1);
    });
}

//Apply on all elements
factory.createCloud().__proto__.prettyPrint = prettyPrint;
factory.createNode().__proto__.prettyPrint = prettyPrint;
factory.createSoftware().__proto__.prettyPrint = prettyPrint;

//call it :-)
cloud.prettyPrint();

//save to JSON file
var savedModel = saver.serialize(cloud);
var fs = require('fs');
fs.writeFile("cloud.json", savedModel, function(err) {
    if(err) {console.log(err);} else {console.log("The file was saved!");}
}); 

console.log(savedModel);
*/