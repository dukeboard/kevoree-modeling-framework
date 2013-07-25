package org.kevoree.test.trace

import java.io.Serializable

/**
 * Created by duke on 25/07/13.
 */

trait ModelTrace: Serializable {

}

class ModelAddTrace(val srcPath: String, val refName: String, val previousPath : String?, val typeName: String?): ModelTrace {
    override fun toString() : String {
        return "ADD { src : \"" + srcPath + "\", refname : \""+refName+"\", previousPath : \""+previousPath+"\", typename : \""+typeName+"\" }"
    }
}

class ModelRemoveTrace(val srcPath: String, val refName: String, val objPath : String): ModelTrace {
    override fun toString() : String {
        return "REMOVEALL { src : \"" + srcPath + "\", refname : \""+refName+"\", objpath : \""+objPath+"\" }"
    }
}

class ModelRemoveAllTrace(val srcPath: String, val refName: String): ModelTrace {
    override fun toString() : String {
        return "REMOVEALL { src : \"" + srcPath + "\", refname : \""+refName+"\" }"
    }
}

class ModelSetTrace(val srcPath: String, val refName: String, val objPath : String?, val content : String?): ModelTrace {
    override fun toString() : String {
        return "SET { src : \"" + srcPath + "\", refname : \""+refName+"\", objPath : \""+objPath+"\", content : \""+content+"\" }"
    }
}