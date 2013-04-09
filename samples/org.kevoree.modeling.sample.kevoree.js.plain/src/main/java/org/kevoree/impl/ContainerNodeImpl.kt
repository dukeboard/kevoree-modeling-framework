package org.kevoree.impl

import org.kevoree.*

class ContainerNodeImpl() : ContainerNodeInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _metaData : String = ""
override internal var _typeDefinition : org.kevoree.TypeDefinition? = null
override internal var _dictionary : org.kevoree.Dictionary? = null
override internal var _components_java_cache :List<org.kevoree.ComponentInstance>? = null
override internal val _components : java.util.HashMap<Any,org.kevoree.ComponentInstance> = java.util.HashMap<Any,org.kevoree.ComponentInstance>()
override internal var _hosts_java_cache :List<org.kevoree.ContainerNode>? = null
override internal val _hosts : java.util.HashMap<Any,org.kevoree.ContainerNode> = java.util.HashMap<Any,org.kevoree.ContainerNode>()
}
