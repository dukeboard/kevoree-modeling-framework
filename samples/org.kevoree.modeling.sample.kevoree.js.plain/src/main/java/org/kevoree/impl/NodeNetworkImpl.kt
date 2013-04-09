package org.kevoree.impl

import org.kevoree.*

class NodeNetworkImpl() : NodeNetworkInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _link_java_cache :List<org.kevoree.NodeLink>? = null
override internal val _link :MutableList<org.kevoree.NodeLink> = java.util.ArrayList<org.kevoree.NodeLink>()
override internal var _initBy : org.kevoree.ContainerNode? = null
override internal var _target : org.kevoree.ContainerNode? = null
}
