var process = {};
(function(){
	function print(writer,o){
		writer.print(o||"");
	}
	function println(writer,o){
		writer.println(o||"");
	}
	function platform(){
		var prop = java.lang.System.getProperty;
		return prop("os.name") + " - " + prop("os.version")+ " ("+prop("os.version")+")";
	}
	function exit(status){
		status = status || 0;
		throw new com.ppedregal.typescript.maven.ProcessExit(status);
	}
	process = {
		stdout: {
			write:function(o){
				print(java.lang.System.out,o);
			},
			writeln:function(o){
				println(java.lang.System.out,o);
			},
            on: function(event, callback) {
                // Graciously ignoring event
            }
		},
		stderr: {
			write:function(o){
				print(java.lang.System.err,o);
			},
			writeln:function(o){
				println(java.lang.System.err,o);
			},
            on: function(event, callback) {
                // Graciously ignoring event
            }
        },
		platform: platform(),
		argv:[],
		exit: exit,
		mainModule: {
			filename:""
		}
	};
})();
var console = {};
var module = {
    exports: function() {
        return true;
    }
};
(function(){
	function doLog(){
		return Array.prototype.slice.call(arguments).join(",");
	}
	function logMsg(lvl,msg){
		return "["+lvl+"] "+Array.prototype.slice.call(msg);
	}
	console = {
		log:function(){
			process.stdout.writeln(Array.prototype.slice.call(arguments).join(","));
		},
		info:function(){
			this.log(logMsg("info",arguments));
		},
		warn:function(){
			this.log(logMsg("warn",arguments));
		},
		error:function(){
			this.log(logMsg("error",arguments));
		},
		debug:function(){
			this.log(logMsg("debug",arguments));
		},	
		trace:function(){
			this.log(logMsg("trace",arguments));
		}	
	};
})();

var setTimeout,
    clearTimeout,
    setInterval,
    clearInterval;

(function () {
    var timer = new java.util.Timer();
    var counter = 1;
    var ids = {};

    setTimeout = function (fn,delay) {
        /* this should work with a newer version of Rhino, but for now it's commented out
           cfr. https://github.com/mozilla/rhino/commit/69b177c7214e0d1ac9656dec33e13aedfe6938a0

           var id = counter++;
           ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
           timer.schedule(ids[id],delay);
           return id;
        */
    }

    clearTimeout = function (id) {
        ids[id].cancel();
        timer.purge();
        delete ids[id];
    }

    setInterval = function (fn,delay) {
        var id = counter++;
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay,delay);
        return id;
    }

    clearInterval = clearTimeout;

})()


function Buffer(data, encoding) {
    this.data = data
    this.encoding = encoding
}