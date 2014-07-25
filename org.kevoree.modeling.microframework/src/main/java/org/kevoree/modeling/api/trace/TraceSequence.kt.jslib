package org.kevoree.modeling.api.trace

import org.kevoree.modeling.api.KMFFactory
import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.json.Lexer
import org.kevoree.modeling.api.json.Type
import org.kevoree.modeling.api.util.ByteConverter
 import org.kevoree.modeling.api.json.JSONString


/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 19:52
 */

public class TraceSequence(val factory : KMFFactory) {

    var traces: MutableList<org.kevoree.modeling.api.trace.ModelTrace> = java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>()

    fun populate(addtraces: List<org.kevoree.modeling.api.trace.ModelTrace>): org.kevoree.modeling.api.trace.TraceSequence {
        traces.addAll(addtraces);
        return this;
    }

    fun append(seq: TraceSequence) {
        traces.addAll(seq.traces)
    }

    fun populateFromString(addtracesTxt: String): org.kevoree.modeling.api.trace.TraceSequence {
        return populateFromStream(ByteConverter.byteArrayInputStreamFromString(addtracesTxt))
    }

    fun populateFromStream(inputStream: java.io.InputStream): org.kevoree.modeling.api.trace.TraceSequence {

        var previousControlSrc: String? = null
        var previousControlTypeName: String? = null


        var lexer: Lexer = Lexer(inputStream)
        var currentToken = lexer.nextToken()
        if (currentToken.tokenType != Type.LEFT_BRACKET) {
            throw Exception("Bad Format : expect [")
        }
        currentToken = lexer.nextToken()
        val keys = java.util.HashMap<String, String>();
        var previousName: String? = null
        while (currentToken.tokenType != Type.EOF && currentToken.tokenType != Type.RIGHT_BRACKET) {
            if (currentToken.tokenType == Type.LEFT_BRACE) {
                keys.clear();
            }
            if (currentToken.tokenType == Type.VALUE) {
                if (previousName != null) {
                    keys.put(previousName!!, currentToken.value.toString());
                    previousName = null
                } else {
                    previousName = currentToken.value.toString()
                }
            }

            if (currentToken.tokenType == Type.RIGHT_BRACE) {
                var traceTypeRead = keys.get(ModelTraceConstants.traceType)
                if (traceTypeRead == null) {
                    traceTypeRead = previousControlTypeName
                }
                when(traceTypeRead) {
                    ActionType.CONTROL.code -> {
                        val src = keys.get(ModelTraceConstants.src)
                        if (src != null) {
                            previousControlSrc = JSONString.unescape(src)!!
                        }
                        val globalTypeName = keys.get(ModelTraceConstants.refname)
                        if (globalTypeName != null) {
                            previousControlTypeName = globalTypeName;
                        }
                    }
                    ActionType.SET.code -> {
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelSetTrace(srcFound!!, keys.get(ModelTraceConstants.refname)!!, JSONString.unescape(keys.get(ModelTraceConstants.objpath)), JSONString.unescape(keys.get(ModelTraceConstants.content)), JSONString.unescape(keys.get(ModelTraceConstants.typename))));
                    }
                    ActionType.ADD.code -> {
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelAddTrace(srcFound!!, keys.get(ModelTraceConstants.refname)!!, JSONString.unescape(keys.get(ModelTraceConstants.previouspath)!!), keys.get(ModelTraceConstants.typename)));
                    }
                    ActionType.ADD_ALL.code -> {
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelAddAllTrace(srcFound!!, keys.get(ModelTraceConstants.refname)!!, JSONString.unescape(keys.get(ModelTraceConstants.content))?.split(";")?.toList(), JSONString.unescape(keys.get(ModelTraceConstants.typename))?.split(";")?.toList()));
                    }
                    ActionType.REMOVE.code -> {
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelRemoveTrace(srcFound!!, keys.get(ModelTraceConstants.refname)!!, JSONString.unescape(keys.get(ModelTraceConstants.objpath)!!)!!));
                    }
                    ActionType.REMOVE_ALL.code -> {
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelRemoveAllTrace(srcFound!!, keys.get(ModelTraceConstants.refname)!!));
                    }
                    ActionType.RENEW_INDEX.code -> {
                    }
                    else -> {
                        println("Trace lost !!!")
                    }
                }
            }
            currentToken = lexer.nextToken()
        }
        return this;
    }

    fun exportToString(): String {
        val buffer = StringBuilder()
        buffer.append("[")
        var isFirst = true
        var previousSrc: String? = null
        var previousType : String? = null
        for (trace in traces) {
            if (!isFirst) {
                buffer.append(",\n")
            }
            if (previousSrc == null || previousSrc != trace.srcPath) {
                buffer.append(ModelControlTrace(trace.srcPath, null).toString())
                buffer.append(",\n")
                previousSrc = trace.srcPath
            }
            if (previousType == null || previousType != trace.traceType.code) {
                buffer.append(ModelControlTrace("", trace.traceType.code).toString())
                buffer.append(",\n")
                previousType = trace.traceType.code
            }
            buffer.append(trace.toCString(false, false))
            isFirst = false
        }
        buffer.append("]")
        return buffer.toString()
    }

    override fun toString(): String {
        return exportToString()
    }

    fun applyOn(target: org.kevoree.modeling.api.KMFContainer): Boolean {
        val traceApplicator = org.kevoree.modeling.api.trace.ModelTraceApplicator(target, factory!!)
        traceApplicator.applyTraceOnModel(this)
        //TODO implements the result
        return true
    }

    fun silentlyApplyOn(target: org.kevoree.modeling.api.KMFContainer): Boolean {
        val traceApplicator = org.kevoree.modeling.api.trace.ModelTraceApplicator(target, factory!!)
        traceApplicator.fireEvents = false
        traceApplicator.applyTraceOnModel(this)
        return true
    }

    fun reverse() {
        var reversed = java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>()
        var i = traces.size
        while(i>0){
            i = i -1;
            reversed.add(traces.get(i))
        }
        traces = reversed
    }

}