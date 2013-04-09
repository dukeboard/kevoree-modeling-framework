package org.kevoree.impl

import org.kevoree.*

class PortTypeRefImpl() : PortTypeRefInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _optional : Boolean = false
override internal var _noDependency : Boolean = false
override internal var _ref : org.kevoree.PortType? = null
override internal var _mappings_java_cache :List<org.kevoree.PortTypeMapping>? = null
override internal val _mappings :MutableList<org.kevoree.PortTypeMapping> = java.util.ArrayList<org.kevoree.PortTypeMapping>()
}
