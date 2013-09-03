package org.kevoree.log

import java.util.Date
import java.lang.StringBuilder

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 23/08/13
 * Time: 11:47
 * To change this template use File | Settings | File Templates.
 */
public object Log {

    /**
     * No logging at all.
     */
    public val LEVEL_NONE : Int = 6;
    /**
     * Critical errors. The application may no longer work correctly.
     */
    public val LEVEL_ERROR : Int = 5;
    /**
     * Important warnings. The application will continue to work correctly.
     */
    public val LEVEL_WARN : Int = 4;
    /**
     * Informative messages. Typically used for deployment.
     */
    public val LEVEL_INFO : Int = 3;
    /**
     * Debug messages. This level is useful during development.
     */
    public val LEVEL_DEBUG : Int = 2;
    /**
     * Trace messages. A lot of information is logged, so this level is usually only needed when debugging a problem.
     */
    public val LEVEL_TRACE : Int = 1;

    /**
     * The level of messages that will be logged. Compiling this and the booleans below as "final" will cause the compiler to
     * remove all "if (Log.info) ..." type statements below the set level.
     */
    var level = LEVEL_INFO;

    /**
     * True when the ERROR level will be logged.
     */
    var ERROR = level <= LEVEL_ERROR;
    /**
     * True when the WARN level will be logged.
     */
    var WARN = level <= LEVEL_WARN;
    /**
     * True when the INFO level will be logged.
     */
    var INFO = level <= LEVEL_INFO;
    /**
     * True when the DEBUG level will be logged.
     */
    var DEBUG = level <= LEVEL_DEBUG;
    /**
     * True when the TRACE level will be logged.
     */
    var TRACE = level <= LEVEL_TRACE;

    /**
     * Sets the level to log. If a version of this class is being used that has a final log level, this has no affect.
     */
    fun set(level: Int) {
        // Comment out method contents when compiling fixed level JARs.
        Log.level = level;
        ERROR = level <= LEVEL_ERROR;
        WARN = level <= LEVEL_WARN;
        INFO = level <= LEVEL_INFO;
        DEBUG = level <= LEVEL_DEBUG;
        TRACE = level <= LEVEL_TRACE;
    }

    fun NONE() {
        set(LEVEL_NONE);
    }

    fun ERROR() {
        set(LEVEL_ERROR);
    }

    fun WARN() {
        set(LEVEL_WARN);
    }

    fun INFO() {
        set(LEVEL_INFO);
    }

    fun DEBUG() {
        set(LEVEL_DEBUG);
    }

    fun TRACE() {
        set(LEVEL_TRACE);
    }

    /**
     * Sets the logger that will write the log messages.
     */
    fun setLogger(logger: Logger) {
        Log.logger = logger;
    }

    private var logger = Logger();

    val beginParam = '{';
    val endParam = '}';

    private fun processMessage(message:String,p1:Any?, p2:Any?, p3:Any?, p4:Any?, p5:Any?):String {
        if (p1 == null) {
            return message;
        }
        var buffer = StringBuilder();
        var previousCharfound = false;
        var param = 0;
        var i = 0;
        while (i < message.length()){
            val currentChar = message.charAt(i);
            if (previousCharfound) {
                if (currentChar == endParam) {
                    param++;
                    when (param) {
                        1 -> {
                            buffer = StringBuilder();
                            buffer.append(message.substring(0, i - 1));
                            buffer.append(p1!!.toString());
                        }
                        2 -> {
                            buffer.append(p2!!.toString());
                        }
                        3 -> {
                            buffer.append(p3!!.toString());
                        }
                        4 -> {
                            buffer.append(p4!!.toString());
                        }
                        5 -> {
                            buffer.append(p5!!.toString());
                        }
                        else -> {
                        }
                    }
                    previousCharfound = false;
                } else {
                    if (buffer != null) {
                        message.charAt(i - 1);
                        buffer.append(currentChar);
                    }
                    previousCharfound = false;
                }
            } else {
                if (currentChar == beginParam) {
                    previousCharfound = true; //next round
                } else {
                    if (buffer != null) {
                        buffer.append(currentChar);
                    }
                }
            }
            i = i + 1;
        }
        if (buffer != null) {
            return buffer.toString();
        } else {
            return message;
        }
    }

    public fun error(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (ERROR) {
            internal_error(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun error(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (ERROR) {
            internal_error(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_error(message : String, ex:Throwable?){
        logger.log(LEVEL_ERROR, message, ex);
    }

    public fun warn(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (WARN) {
            internal_warn(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun warn(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (WARN) {
            internal_warn(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_warn(message : String, ex:Throwable?){
        logger.log(LEVEL_WARN, message, ex);
    }


    public fun info(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (INFO) {
            internal_info(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun info(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (INFO) {
            internal_info(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_info(message : String, ex:Throwable?){
        logger.log(LEVEL_INFO, message, ex);
    }

    public fun debug(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (DEBUG) {
            internal_debug(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun debug(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (DEBUG) {
            internal_debug(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_debug(message : String, ex:Throwable?){
        logger.log(LEVEL_DEBUG, message, ex);
    }

    public fun trace(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (TRACE) {
            internal_trace(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun trace(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (TRACE) {
            internal_trace(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_trace(message : String, ex:Throwable?){
        logger.log(LEVEL_TRACE, message, ex);
    }


}

    /**
     * Performs the actual logging. Default implementation logs to System.out. Extended and use {@link Log#logger} set to handle
     * logging differently.
     */
    public class Logger {
        val firstLogTime = Date().getTime();
        val error_msg = " ERROR: ";
        val warn_msg = " WARN: ";
        val info_msg = " INFO: ";
        val debug_msg = " DEBUG: ";
        val trace_msg = " TRACE: ";
        var category : String? = null;

        public fun setCategory(category: String) {
            this.category = category;
        }

        public fun log(level: Int, message: String, ex: Throwable?) {
            val builder = StringBuilder();
            val time = Date().getTime() - firstLogTime;
            val minutes = time / (1000 * 60);
            val seconds = time / (1000) % 60;
            if (minutes <= 9) builder.append('0');
            builder.append(minutes.toString());
            builder.append(':');
            if (seconds <= 9) builder.append('0');
            builder.append(seconds.toString());
            when (level) {
                Log.LEVEL_ERROR -> {
                    builder.append(error_msg);
                }
                Log.LEVEL_WARN -> {
                    builder.append(warn_msg);
                }
                Log.LEVEL_INFO -> {
                    builder.append(info_msg);
                }
                Log.LEVEL_DEBUG -> {
                    builder.append(debug_msg);
                }
                Log.LEVEL_TRACE -> {
                    builder.append(trace_msg);
                }
                else -> {
                }
            }
            if(category != null) {
                builder.append('[');
                builder.append(category!!.toString());
                builder.append("] ");
            }
            builder.append(message);
            if (ex != null) {
                /*val writer = StringWriter(256);
                ex.printStackTrace(PrintWriter(writer));
                builder.append('\n');
                builder.append(writer.toString().trim());*/
                builder.append(ex.getMessage().toString());
            }
            print(builder.toString());
        }

        /**
         * Prints the message to System.out. Called by the default implementation of {@link #log(int, String, Throwable)}.
         */
        protected fun print(message:String) {
            println(message);
        }
    }