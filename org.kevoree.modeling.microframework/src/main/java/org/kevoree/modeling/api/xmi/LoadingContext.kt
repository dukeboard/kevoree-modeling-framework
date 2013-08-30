package org.kevoree.modeling.api.xmi

import javax.xml.stream.XMLStreamReader

public class LoadingContext() {

    var xmiReader : XMLStreamReader? = null

    var loadedRoots : java.util.ArrayList<Any> = java.util.ArrayList<Any>()

    val map : java.util.HashMap<String, Any> = java.util.HashMap<String, Any>()

    val elementsCount : java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()

    val resolvers : java.util.ArrayList<org.kevoree.modeling.api.util.ResolveCommand> = java.util.ArrayList<org.kevoree.modeling.api.util.ResolveCommand>()

    val stats : java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()

    val oppositesAlreadySet : java.util.HashMap<String, Boolean> = java.util.HashMap<String, Boolean>()

    public fun isOppositeAlreadySet(localRef : String, oppositeRef : String) : Boolean {
        val res = (oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null))
        return res
    }

    public fun storeOppositeRelation(localRef : String, oppositeRef : String) {
        oppositesAlreadySet.put(localRef + "_" + oppositeRef, true)
    }

}
