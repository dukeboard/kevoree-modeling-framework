function log(m,s){
	console.debug("path."+m+": "+s);
}
function argv(args){
	return Array.prototype.slice.call(args).join(",");
}
function path(f){
	return new String(f.getCanonicalPath()).replace(/[\/\\]/g,java.io.File.separator);
}
exports.dirname=function(s){
	var file = new java.io.File(s||".");
	if (file.isDirectory()){
		return path(file);
	} else {
		return path(file.getParentFile());
	}
}
exports.resolve=function(){
	var resolved;
	switch (arguments.length){
	case 0:
		resolved = path(new java.io.File("."));
	default:
		try {
			var cwd = new java.io.File(arguments[0]||".").toURI();
			for (var i=1,li=arguments.length;i<li;i++){
				cwd = cwd.resolve(arguments[i]);
			}
			resolved = path(new java.io.File(cwd));
		} catch (e){
			console.error(e);
		}
	}
	return resolved;
}