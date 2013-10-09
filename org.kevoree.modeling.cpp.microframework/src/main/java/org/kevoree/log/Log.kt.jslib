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

    var level = LEVEL_INFO;
        set(newLevel){
              $level = newLevel;
              _ERROR = newLevel <= LEVEL_ERROR;
              _WARN = newLevel <= LEVEL_WARN;
              _INFO = newLevel <= LEVEL_INFO;
              _DEBUG = newLevel <= LEVEL_DEBUG;
              _TRACE = newLevel <= LEVEL_TRACE;
        }

    private var _ERROR = level <= LEVEL_ERROR;

    private var _WARN = level <= LEVEL_WARN;

    private var _INFO = level <= LEVEL_INFO;

    private var _DEBUG = level <= LEVEL_DEBUG;

    private var _TRACE = level <= LEVEL_TRACE;

    fun NONE() {
        level = LEVEL_NONE;
    }

    fun ERROR() {
        level = LEVEL_ERROR;
    }

    fun WARN() {
        level = LEVEL_WARN;
    }

    fun INFO() {
        level = LEVEL_INFO;
    }

    fun DEBUG() {
        level = LEVEL_DEBUG;
    }

    fun TRACE() {
        level = LEVEL_TRACE;
    }

    var logger = Logger();

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
        if (_ERROR) {
            internal_error(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun error(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_ERROR) {
            internal_error(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_error(message : String, ex:Throwable?){
        logger.log(LEVEL_ERROR, message, ex);
    }

    public fun warn(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_WARN) {
            internal_warn(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun warn(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_WARN) {
            internal_warn(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_warn(message : String, ex:Throwable?){
        logger.log(LEVEL_WARN, message, ex);
    }


    public fun info(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_INFO) {
            internal_info(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun info(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_INFO) {
            internal_info(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_info(message : String, ex:Throwable?){
        logger.log(LEVEL_INFO, message, ex);
    }

    public fun debug(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_DEBUG) {
            internal_debug(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun debug(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_DEBUG) {
            internal_debug(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_debug(message : String, ex:Throwable?){
        logger.log(LEVEL_DEBUG, message, ex);
    }

    public fun trace(message:String, ex:Throwable?,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_TRACE) {
            internal_trace(processMessage(message, p1, p2, p3, p4, p5), ex);
        }
    }
    public fun trace(message:String,p1:Any?=null, p2:Any?=null, p3:Any?=null, p4:Any?=null, p5:Any?=null) {
        if (_TRACE) {
            internal_trace(processMessage(message, p1, p2, p3, p4, p5), null);
        }
    }
    private fun internal_trace(message : String, ex:Throwable?){
        logger.log(LEVEL_TRACE, message, ex);
    }


}

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
                builder.append(ex.getMessage().toString());
            }
            when (level) {
                Log.LEVEL_ERROR -> {
                    js.debug.console.error(builder.toString());
                }
                Log.LEVEL_WARN -> {
                    js.debug.console.warn(builder.toString());
                }
                Log.LEVEL_INFO -> {
                    js.debug.console.info(builder.toString());
                }
                Log.LEVEL_DEBUG -> {
                    js.debug.console.log(builder.toString());
                }
                Log.LEVEL_TRACE -> {
                    js.debug.console.log(builder.toString());
                }
                else -> {
                }
            }
        }

    }