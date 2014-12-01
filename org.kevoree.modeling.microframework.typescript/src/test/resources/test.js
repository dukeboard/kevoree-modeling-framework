var fs = require('fs');

// file is included here:
eval(fs.readFileSync(__dirname + '/es6-collections.js')+'');
eval(fs.readFileSync(__dirname + '/../classes/java.js')+'');
eval(fs.readFileSync(__dirname + '/../classes/org.kevoree.modeling.microframework.typescript.js')+'');
eval(fs.readFileSync(__dirname + '/org.kevoree.modeling.microframework.typescript.js')+'');

var timeTestSuite = new org.kevoree.modeling.microframework.test.TimeTest();
timeTestSuite.timeCreationTest();
timeTestSuite.objectModificationTest();
timeTestSuite.simpleTimeNavigationTest();
timeTestSuite.distortedTimeNavigationTest();
console.log("Tests run finished!");
