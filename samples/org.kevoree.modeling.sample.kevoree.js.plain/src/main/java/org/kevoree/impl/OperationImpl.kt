package org.kevoree.impl

import org.kevoree.*

class OperationImpl() : OperationInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _parameters_java_cache :List<org.kevoree.Parameter>? = null
override internal val _parameters : java.util.HashMap<Any,org.kevoree.Parameter> = java.util.HashMap<Any,org.kevoree.Parameter>()
override internal var _returnType : org.kevoree.TypedElement? = null
}
