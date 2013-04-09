package org.kevoree.impl

import org.kevoree.*

class NodeLinkImpl() : NodeLinkInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _networkType : String = ""
override internal var _estimatedRate : Int = 0
override internal var _lastCheck : String = ""
override internal var _networkProperties_java_cache :List<org.kevoree.NetworkProperty>? = null
override internal val _networkProperties : java.util.HashMap<Any,org.kevoree.NetworkProperty> = java.util.HashMap<Any,org.kevoree.NetworkProperty>()
}
