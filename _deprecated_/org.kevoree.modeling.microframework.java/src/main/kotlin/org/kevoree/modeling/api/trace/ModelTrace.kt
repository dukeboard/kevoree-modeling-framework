package org.kevoree.modeling.api.trace

import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.json.JSONString


/**
 * Created by duke on 25/07/13.
 */

//TODO optimize code redondency

object ModelTraceConstants {
    val traceType: String = "t"
    val src: String = "s"
    val refname: String = "r"
    val previouspath: String = "p"
    val typename: String = "n"
    val objpath: String = "o"
    val content: String = "c"
    val openJSON: String = "{"
    val closeJSON: String = "}"
    val bb: String = "\""
    val coma: String = ","
    val dp: String = ":"
}

trait ModelTrace {
    val refName: String
    val traceType : ActionType
    val srcPath: String
    override fun toString(): String {
        return toCString(true, true)
    }
    fun toCString(withTypeName: Boolean, withSrcPath: Boolean): String
}

class ModelControlTrace(override val srcPath: String, val traceTypeGlobal: String?) : ModelTrace {

    override val refName: String = ""

    override val traceType : ActionType = ActionType.CONTROL

    override fun toCString(withTypeName: Boolean, withSrcPath: Boolean): String {
        val buffer = StringBuilder()
        buffer.append(ModelTraceConstants.openJSON)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.traceType)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.dp)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ActionType.CONTROL.code)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.coma)
        if (traceTypeGlobal == null) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.src)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, srcPath)
            buffer.append(ModelTraceConstants.bb)
        } else {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.refname)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(traceTypeGlobal)
            buffer.append(ModelTraceConstants.bb)
        }
        buffer.append(ModelTraceConstants.closeJSON)
        return buffer.toString()
    }
}

class ModelAddTrace(override val srcPath: String, override val refName: String, val previousPath: String?, val typeName: String?) : ModelTrace {

    override val traceType : ActionType = ActionType.ADD

    override fun toCString(withTypeName: Boolean, withSrcPath: Boolean): String {
        val buffer = StringBuilder()
        buffer.append(ModelTraceConstants.openJSON)
        if (withTypeName) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.traceType)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ActionType.ADD.code)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        if (withSrcPath) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.src)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, srcPath)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.refname)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.dp)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(refName)
        buffer.append(ModelTraceConstants.bb)
        if (previousPath != null) {
            buffer.append(ModelTraceConstants.coma)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.previouspath)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, previousPath)
            buffer.append(ModelTraceConstants.bb)
        }
        if (typeName != null) {
            buffer.append(ModelTraceConstants.coma)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.typename)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, typeName)
            buffer.append(ModelTraceConstants.bb)
        }
        buffer.append(ModelTraceConstants.closeJSON)
        return buffer.toString()
    }
}

class ModelAddAllTrace(override val srcPath: String, override val refName: String, val previousPath: List<String>?, val typeName: List<String>?) : ModelTrace {

    override val traceType : ActionType = ActionType.ADD_ALL

    private fun mkString(ss: List<String>?): String? {
        if (ss == null) {
            return null
        }
        val buffer = StringBuilder()
        var isFirst = true
        for (s in ss) {
            if (!isFirst) {
                buffer.append(ModelTraceConstants.coma)
            }
            buffer.append(s)
            isFirst = false
        }
        return buffer.toString()
    }

    override fun toCString(withTypeName: Boolean, withSrcPath: Boolean): String {
        val buffer = StringBuilder()
        buffer.append(ModelTraceConstants.openJSON)
        if (withTypeName) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.traceType)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ActionType.ADD_ALL.code)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        if (withSrcPath) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.src)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, srcPath)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.refname)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.dp)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(refName)
        buffer.append(ModelTraceConstants.bb)
        if (previousPath != null) {
            buffer.append(ModelTraceConstants.coma)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.previouspath)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, mkString(previousPath))
            buffer.append(ModelTraceConstants.bb)
        }
        if (typeName != null) {
            buffer.append(ModelTraceConstants.coma)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.typename)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, mkString(typeName))
            buffer.append(ModelTraceConstants.bb)
        }
        buffer.append(ModelTraceConstants.closeJSON)
        return buffer.toString()
    }
}

class ModelRemoveTrace(override val srcPath: String, override val refName: String, val objPath: String) : ModelTrace {

    override val traceType : ActionType = ActionType.REMOVE

    override fun toCString(withTypeName: Boolean, withSrcPath: Boolean): String {
        val buffer = StringBuilder()
        buffer.append(ModelTraceConstants.openJSON)
        if (withTypeName) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.traceType)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ActionType.REMOVE.code)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        if (withSrcPath) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.src)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, srcPath)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.refname)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.dp)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(refName)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.coma)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.objpath)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.dp)
        buffer.append(ModelTraceConstants.bb)
        JSONString.encodeBuffer(buffer, objPath)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.closeJSON)
        return buffer.toString()
    }
}

class ModelRemoveAllTrace(override val srcPath: String, override val refName: String) : ModelTrace {

    override val traceType : ActionType = ActionType.REMOVE_ALL

    override fun toCString(withTypeName: Boolean, withSrcPath: Boolean): String {
        val buffer = StringBuilder()
        buffer.append(ModelTraceConstants.openJSON)
        if (withTypeName) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.traceType)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ActionType.REMOVE_ALL.code)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        if (withSrcPath) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.src)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, srcPath)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.refname)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.dp)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(refName)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.closeJSON)
        return buffer.toString()
    }
}

class ModelSetTrace(override val srcPath: String, override val refName: String, val objPath: String?, val content: String?, val typeName: String?) : ModelTrace {

    override val traceType : ActionType = ActionType.SET

    override fun toCString(withTypeName: Boolean, withSrcPath: Boolean): String {
        val buffer = StringBuilder()
        buffer.append(ModelTraceConstants.openJSON)
        if (withTypeName) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.traceType)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ActionType.SET.code)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        if (withSrcPath) {
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.src)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, srcPath)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.coma)
        }
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.refname)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(ModelTraceConstants.dp)
        buffer.append(ModelTraceConstants.bb)
        buffer.append(refName)
        buffer.append(ModelTraceConstants.bb)
        if (objPath != null) {
            buffer.append(ModelTraceConstants.coma)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.objpath)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, objPath)
            buffer.append(ModelTraceConstants.bb)
        }
        if (content != null) {
            buffer.append(ModelTraceConstants.coma)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.content)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, content)
            buffer.append(ModelTraceConstants.bb)
        }
        if (typeName != null) {
            buffer.append(ModelTraceConstants.coma)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.typename)
            buffer.append(ModelTraceConstants.bb)
            buffer.append(ModelTraceConstants.dp)
            buffer.append(ModelTraceConstants.bb)
            JSONString.encodeBuffer(buffer, typeName)
            buffer.append(ModelTraceConstants.bb)
        }
        buffer.append(ModelTraceConstants.closeJSON)
        return buffer.toString()
    }

}