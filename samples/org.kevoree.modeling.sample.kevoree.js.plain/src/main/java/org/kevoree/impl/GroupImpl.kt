package org.kevoree.impl

import org.kevoree.*

class GroupImpl() : GroupInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _metaData : String = ""
override internal var _typeDefinition : org.kevoree.TypeDefinition? = null
override internal var _dictionary : org.kevoree.Dictionary? = null
override internal var _subNodes_java_cache :List<org.kevoree.ContainerNode>? = null
override internal val _subNodes : java.util.HashMap<Any,org.kevoree.ContainerNode> = java.util.HashMap<Any,org.kevoree.ContainerNode>()
}
