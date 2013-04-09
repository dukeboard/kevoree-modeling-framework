package org.kevoree.impl

import org.kevoree.*

class NamespaceImpl() : NamespaceInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _childs_java_cache :List<org.kevoree.Namespace>? = null
override internal val _childs : java.util.HashMap<Any,org.kevoree.Namespace> = java.util.HashMap<Any,org.kevoree.Namespace>()
override internal var _parent : org.kevoree.Namespace? = null
}
