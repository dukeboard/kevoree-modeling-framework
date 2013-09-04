package org.kevoree.modeling.api.trace

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.KMFFactory
import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.json.Lexer
import org.kevoree.modeling.api.json.Type
import org.kevoree.modeling.api.util.ByteConverter

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 19:52
 */

public trait TraceSequence {

    var traces : java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>

    var factory : KMFFactory?

    fun populate(addtraces : List<org.kevoree.modeling.api.trace.ModelTrace>) : org.kevoree.modeling.api.trace.TraceSequence {
        traces.addAll(addtraces);
        return this;
    }

    fun populateFromString(addtracesTxt : String) : org.kevoree.modeling.api.trace.TraceSequence{
        return populateFromStream(ByteConverter.byteArrayInputStreamFromString(addtracesTxt))
    }

    fun populateFromStream(inputStream : java.io.InputStream) : org.kevoree.modeling.api.trace.TraceSequence {
        var lexer: Lexer = Lexer(inputStream)
        var currentToken = lexer.nextToken()
        if(currentToken.tokenType != Type.LEFT_BRACKET){
            throw Exception("Bad Format : expect [")
        }
        currentToken = lexer.nextToken()
        val keys = java.util.HashMap<String,String>();
        var previousName : String? = null
        while (currentToken.tokenType != Type.EOF && currentToken.tokenType != Type.RIGHT_BRACKET) {
            if(currentToken.tokenType == Type.LEFT_BRACE){
                keys.clear();
            }
            if(currentToken.tokenType == Type.VALUE){
                if(previousName!= null){
                    keys.put(previousName!!,currentToken.value.toString());
                    previousName = null
                }   else {
                    previousName = currentToken.value.toString()
                }
            }

            if(currentToken.tokenType == Type.RIGHT_BRACE){
                when(keys.get("traceType")!!) {
                    ActionType.SET.toString() -> {
                        traces.add(ModelSetTrace(keys.get("src")!!,keys.get("refname")!!,keys.get("objpath"),keys.get("content"),keys.get("typename")));
                    }
                    ActionType.ADD.toString() -> {
                        traces.add(ModelAddTrace(keys.get("src")!!,keys.get("refname")!!,keys.get("previouspath")!!,keys.get("typename")));
                    }
                    ActionType.ADD_ALL.toString() -> {
                        traces.add(ModelAddAllTrace(keys.get("src")!!,keys.get("refname")!!,keys.get("content")?.split(";")?.toList(),keys.get("typename")?.split(";")?.toList()));
                    }
                    ActionType.REMOVE.toString() -> {
                        traces.add(ModelRemoveTrace(keys.get("src")!!,keys.get("refname")!!,keys.get("objpath")!!));
                    }
                    ActionType.REMOVE_ALL.toString() -> {
                        traces.add(ModelRemoveAllTrace(keys.get("src")!!,keys.get("refname")!!));
                    }
                    ActionType.RENEW_INDEX.toString() -> {
                    }
                    else -> {
                        println("Trace lost !!!" )
                    }
                }
            }
            currentToken = lexer.nextToken()
        }
        return this;
    }

    fun exportToString() : String {
        val buffer = StringBuilder()
        buffer.append("[")
        var isFirst = true
        for(trace in traces){
            if(!isFirst){
                buffer.append(",")
            }
            buffer.append(trace.toString())
            isFirst = false
        }
        buffer.append("]")
        return buffer.toString()
    }

    fun applyOn(target : org.kevoree.modeling.api.KMFContainer) : Boolean {
        val traceApplicator = org.kevoree.modeling.api.trace.ModelTraceApplicator(target,factory!!)
        traceApplicator.applyTraceOnModel(this)
        //TODO implements the result
        return true
    }
}