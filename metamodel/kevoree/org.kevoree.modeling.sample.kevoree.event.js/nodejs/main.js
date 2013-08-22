var fs = require('fs');
var Kevoree = require('../target/js/org.kevoree.modeling.sample.kevoree.event.js.merged.js');

var compare = new Kevoree.org.kevoree.compare.DefaultModelCompare();
var loader = new Kevoree.org.kevoree.loader.JSONModelLoader();

var model1txt = fs.readFileSync('model1.json').toString();
var model2txt = fs.readFileSync('model2.json').toString();

var model1 = loader.loadModelFromString(model1txt).get(0);
var model2 = loader.loadModelFromString(model2txt).get(0);;

var compare = new Kevoree.org.kevoree.compare.DefaultModelCompare(),
diffSeq = compare.diff(model1, model2);

try {
	diffSeq.applyOn(model1);
} catch(e){
	console.error("Catch error during apply on ");
	console.error(e);
}

