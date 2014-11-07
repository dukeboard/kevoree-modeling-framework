function log(m,s){
	console.debug("fs."+m+": "+s);
}
function javafile(path){
	var p = String(path).replace(/[\/\\]/g,String(java.io.File.separator));
	return new java.io.File(p);
}
function argv(args){
	return Array.prototype.slice.call(args).join(",");
}
var Stats = (function(){
	function Stats(path){
		this.javafile=javafile(path);
	}
	Stats.prototype.isFile=function(){
		return Boolean(this.javafile.isFile());
	};
	Stats.prototype.isDirectory=function(){
		return Boolean(this.javafile.isDirectory());
	};
	Stats.prototype.isBlockDevice=function(){
		return false;		
	};
	Stats.prototype.isCharacterDevice=function(){
		return false;		
	};
	Stats.prototype.isSymbolicLink=function(){
		return false;		
	};
	Stats.prototype.isFIFO=function(){
		return false;
	};
	Stats.prototype.isSocket=function(){
		return false;
	};	
	return Stats;	
})();

exports.readFileSync=function(path,enc){
	enc=enc||process.encoding||"utf-8";
	var f = javafile(path),
		reader = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f),enc));
	try {
		var buffer = new java.lang.StringBuffer(),
			line;
		while ((line=reader.readLine())!=null){
			buffer.append(line);
			buffer.append("\r\n");
		}
	} catch (e){
		return null;
	} finally {
		reader.close();
	}
	reader = null;
	return {
		"0":0,
		"1":0,
		toString:function(){
			return new String(buffer.toString());
		}
	};
};
exports.writeFileSync=function(path,data,enc){
        process.stdout.writeln(data)
	log("writeFileSync",argv(arguments));
	enc=enc||process.encoding||"utf-8";
	var f = javafile(path),
		writer = new java.io.BufferedWriter(new java.io.OutputStreamWriter(new java.io.FileOutputStream(f),enc));
	try {
		writer.write(data,0,data.length);
	} catch (e){		
	} finally {
		writer.close();
	}
	writer=null;
};
exports.unlinkSync=function(path){
	return javafile(path)["delete"]();
};
exports.existsSync=function(path){
	return javafile(path).exists();
};
exports.statSync=function(path){
	return new Stats(path);
};
exports.lstatSync=function(path){
	return new Stats(path);
};
exports.fstatSync=function(path){
	return new Stats(path);
};
exports.mkdirSync=function(path){
	return javafile(path).mkdir();
};
exports.openSync=function(path,flags,mode){
	var enc = process.encoding||"utf-8",
		f = javafile(path),
		writer = new java.io.BufferedWriter(new java.io.OutputStreamWriter(new java.io.FileOutputStream(f),enc));
	return writer;
};
exports.writeSync=function(fd,buffer,offset,len,pos){
    fd.write(new String(buffer.data, buffer.encoding));
};
exports.closeSync=function(fd){
	fd.close();
};
exports.readdirSync=function(path){
	var arr = javafile(path).list();
	for (var i=0,li=arr.length;i<li;i++){
		arr[i]=new String(arr[i]);
	}
	return arr;
};
exports.unwatchFile=function(){
	log("unwatchFile",argv(arguments));
};
exports.watchFile=function(){
	log("watchFile",argv(arguments));
};
exports.realpathSync=function(){
	return new String(javafile(path).getCanonicalPath()).replace(/[\/\\]/g,java.io.File.separator);
};