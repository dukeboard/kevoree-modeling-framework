var fs = require('fs');

// file is included here:
eval(fs.readFileSync(__dirname + '/es6-collections.js')+'');
eval(fs.readFileSync(__dirname + '/../classes/java.js')+'');
eval(fs.readFileSync(__dirname + '/../classes/org.kevoree.modeling.microframework.typescript.js')+'');
eval(fs.readFileSync(__dirname + '/org.kevoree.modeling.microframework.typescript.js')+'');
eval(fs.readFileSync(__dirname + '/TestRunner.js')+'');

var timeTestSuite = new FlatJUnitTest();
timeTestSuite.run();
console.log("Tests run finished!");
