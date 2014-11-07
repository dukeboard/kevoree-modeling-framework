function log(m,s){
	process.stdout.writeln("module."+m+": "+s);
}
function argv(args){
	return Array.prototype.slice.call(args).join(",");
}

exports = function() {
    process.stdout.writeln("Here's Johnny!!");
    true
}

exports._nodeModulePaths=function(){
	process.stdout.writeln("_nodeModulePaths",argv(arguments));
};