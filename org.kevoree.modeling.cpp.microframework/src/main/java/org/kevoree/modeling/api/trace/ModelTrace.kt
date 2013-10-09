package org.kevoree.modeling.api.trace

import org.kevoree.modeling.api.util.ActionType


/**
 * Created by duke on 25/07/13.
 */

trait ModelTrace {
    fun toString(): String
}

class ModelAddTrace(val srcPath: String, val refName: String, val previousPath: String?, val typeName: String?): ModelTrace {
    override fun toString(): String {
        val buffer = StringBuilder()
        buffer.append("{ \"traceType\" : " + ActionType.ADD + " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" + refName + "\"")
        if(previousPath != null){
            buffer.append(", \"previouspath\" : \"" + previousPath + "\"")
        }
        if(typeName != null){
            buffer.append(", \"typename\" : \"" + typeName + "\"")
        }
        buffer.append("}")
        return buffer.toString()
    }
}

class ModelAddAllTrace(val srcPath: String, val refName: String, val previousPath: List<String>?, val typeName: List<String>?): ModelTrace {

    private fun mkString(ss: List<String>?): String? {
        if(ss == null){
            return null
        }
        val buffer = StringBuilder()
        var isFirst = true
        for(s in ss){
            if(!isFirst){
                buffer.append(",")
            }
            buffer.append(s)
            isFirst = false
        }
        return buffer.toString()
    }

    override fun toString(): String {
        val buffer = StringBuilder()
        buffer.append("{ \"traceType\" : " + ActionType.ADD_ALL + " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" + refName + "\"")
        if(previousPath != null){
            buffer.append(", \"previouspath\" : \"" + mkString(previousPath) + "\"")
        }
        if(typeName != null){
            buffer.append(", \"typename\" : \"" + mkString(typeName) + "\"")
        }
        buffer.append("}")
        return buffer.toString()
    }
}

class ModelRemoveTrace(val srcPath: String, val refName: String, val objPath: String): ModelTrace {
    override fun toString(): String {
        return "{ \"traceType\" : " + ActionType.REMOVE + " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" + refName + "\", \"objpath\" : \"" + objPath + "\" }"
    }
}

class ModelRemoveAllTrace(val srcPath: String, val refName: String): ModelTrace {
    override fun toString(): String {
        return "{ \"traceType\" : " + ActionType.REMOVE_ALL + " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" + refName + "\" }"
    }
}

class ModelSetTrace(val srcPath: String, val refName: String, val objPath: String?, val content: String?, val typeName: String?): ModelTrace {
    override fun toString(): String {
        val buffer = StringBuilder()
        buffer.append("{ \"traceType\" : " + ActionType.SET + " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" + refName + "\"")
        if(objPath != null){
            buffer.append(", \"objpath\" : \"" + objPath + "\"")
        }
        if(content != null){
            buffer.append(", \"content\" : \"" + content + "\"")
        }
        if(typeName != null){
            buffer.append(", \"typename\" : \"" + typeName + "\"")
        }
        buffer.append("}")
        return buffer.toString()
    }

}