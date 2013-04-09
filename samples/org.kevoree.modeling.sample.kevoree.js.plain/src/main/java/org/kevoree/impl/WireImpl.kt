package org.kevoree.impl

import org.kevoree.*

class WireImpl() : WireInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _ports_java_cache :List<org.kevoree.PortTypeRef>? = null
override internal val _ports : java.util.HashMap<Any,org.kevoree.PortTypeRef> = java.util.HashMap<Any,org.kevoree.PortTypeRef>()
}
