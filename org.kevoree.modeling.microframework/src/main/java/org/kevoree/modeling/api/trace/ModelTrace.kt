package org.kevoree.modeling.api.trace

import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.json.JSONString


/**
 * Created by duke on 25/07/13.
 */

trait ModelTrace {
    val srcPath: String
    val refName: String
    fun toString(): String
}

class ModelAddTrace(override val srcPath: String, override val refName: String, val previousPath: String?, val typeName: String?) : ModelTrace {
    override fun toString(): String {
        val buffer = StringBuilder()
        buffer.append("{ \"traceType\" : \"")
        buffer.append(ActionType.ADD)
        buffer.append("\" , \"src\" : \"")
        JSONString.encodeBuffer(buffer, srcPath)
        buffer.append("\", \"refname\" : \"")
        buffer.append(refName)
        buffer.append("\"")
        if (previousPath != null) {
            buffer.append(", \"previouspath\" : \"")
            JSONString.encodeBuffer(buffer, previousPath)
            buffer.append("\"")
        }
        if (typeName != null) {
            buffer.append(", \"typename\" : \"")
            JSONString.encodeBuffer(buffer, typeName)
            buffer.append("\"")
        }
        buffer.append("}")
        return buffer.toString()
    }
}

class ModelAddAllTrace(override val srcPath: String, override val refName: String, val previousPath: List<String>?, val typeName: List<String>?) : ModelTrace {

    private fun mkString(ss: List<String>?): String? {
        if (ss == null) {
            return null
        }
        val buffer = StringBuilder()
        var isFirst = true
        for (s in ss) {
            if (!isFirst) {
                buffer.append(",")
            }
            buffer.append(s)
            isFirst = false
        }
        return buffer.toString()
    }

    override fun toString(): String {
        val buffer = StringBuilder()
        buffer.append("{ \"traceType\" : \"")
        buffer.append(ActionType.ADD_ALL)
        buffer.append("\" , \"src\" : \"")
        JSONString.encodeBuffer(buffer, srcPath)
        buffer.append("\", \"refname\" : \"")
        buffer.append(refName)
        buffer.append("\"")
        if (previousPath != null) {
            buffer.append(", \"previouspath\" : \"")
            JSONString.encodeBuffer(buffer, mkString(previousPath))
            buffer.append("\"")
        }
        if (typeName != null) {
            buffer.append(", \"typename\" : \"")
            JSONString.encodeBuffer(buffer, mkString(typeName))
            buffer.append("\"")
        }
        buffer.append("}")
        return buffer.toString()
    }
}

class ModelRemoveTrace(override val srcPath: String, override val refName: String, val objPath: String) : ModelTrace {
    override fun toString(): String {
        val buffer = StringBuilder()
        buffer.append("{ \"traceType\" : \"")
        buffer.append(ActionType.REMOVE)
        buffer.append("\" , \"src\" : \"")
        JSONString.encodeBuffer(buffer, srcPath)
        buffer.append("\", \"refname\" : \"")
        buffer.append(refName)
        buffer.append("\", \"objpath\" : \"")
        JSONString.encodeBuffer(buffer, objPath)
        buffer.append("\" }")
        return buffer.toString()
    }
}

class ModelRemoveAllTrace(override val srcPath: String, override val refName: String) : ModelTrace {
    override fun toString(): String {
        val buffer = StringBuilder()
        buffer.append("{ \"traceType\" : \"")
        buffer.append(ActionType.REMOVE_ALL)
        buffer.append("\" , \"src\" : \"")
        JSONString.encodeBuffer(buffer, srcPath)
        buffer.append("\", \"refname\" : \"")
        buffer.append(refName)
        buffer.append("\" }")
        return buffer.toString()
    }
}

class ModelSetTrace(override val srcPath: String, override val refName: String, val objPath: String?, val content: String?, val typeName: String?) : ModelTrace {
    override fun toString(): String {
        val buffer = StringBuilder()
        buffer.append("{ \"traceType\" : \"")
        buffer.append(ActionType.SET)
        buffer.append("\" , \"src\" : \"")
        JSONString.encodeBuffer(buffer, srcPath)
        buffer.append("\", \"refname\" : \"")
        buffer.append(refName)
        buffer.append("\"")
        if (objPath != null) {
            buffer.append(", \"objpath\" : \"")
            JSONString.encodeBuffer(buffer, objPath)
            buffer.append("\"")
        }
        if (content != null) {
            buffer.append(", \"content\" : \"")
            JSONString.encodeBuffer(buffer, content)
            buffer.append("\"")
        }
        if (typeName != null) {
            buffer.append(", \"typename\" : \"")
            JSONString.encodeBuffer(buffer, typeName)
            buffer.append("\"")
        }
        buffer.append("}")
        return buffer.toString()
    }

}