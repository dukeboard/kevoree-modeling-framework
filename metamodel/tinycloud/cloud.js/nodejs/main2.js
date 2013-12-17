var model = require('../target/js/org.kevoree.modeling.sample.cloud.js.merged.js');

var saver = new model.org.cloud.serializer.JSONModelSerializer();
var loader = new model.org.cloud.loader.JSONModelLoader();
var xsaver = new model.org.cloud.serializer.XMIModelSerializer();
var xloader = new model.org.cloud.loader.XMIModelLoader();
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
var savedModel = xsaver.serialize(cloud);
console.log(savedModel);

var loadedModel = xloader.loadModelFromString(savedModel).get(0);
var clonedModel = cloner.clone(loadedModel);
var savedModel2 = saver.serialize(loadedModel);

console.log(savedModel2);

//var loadedModel = loader.loadModelFromString(savedModel).get(0);


//var traceSeq = compare.inter(clonedModel,clonedModel);
//var traceSeqString = traceSeq.toString();
//var newTraceSeq = compare.createSequence();
//newTraceSeq.populateFromString(traceSeqString);
//console.log(newTraceSeq.toString());
