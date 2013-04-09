package org.kevoree.impl

import org.kevoree.*

class ContainerRootImpl() : ContainerRootInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _nodes_java_cache :List<org.kevoree.ContainerNode>? = null
override internal val _nodes : java.util.HashMap<Any,org.kevoree.ContainerNode> = java.util.HashMap<Any,org.kevoree.ContainerNode>()
override internal var _typeDefinitions_java_cache :List<org.kevoree.TypeDefinition>? = null
override internal val _typeDefinitions : java.util.HashMap<Any,org.kevoree.TypeDefinition> = java.util.HashMap<Any,org.kevoree.TypeDefinition>()
override internal var _repositories_java_cache :List<org.kevoree.Repository>? = null
override internal val _repositories : java.util.HashMap<Any,org.kevoree.Repository> = java.util.HashMap<Any,org.kevoree.Repository>()
override internal var _dataTypes_java_cache :List<org.kevoree.TypedElement>? = null
override internal val _dataTypes : java.util.HashMap<Any,org.kevoree.TypedElement> = java.util.HashMap<Any,org.kevoree.TypedElement>()
override internal var _libraries_java_cache :List<org.kevoree.TypeLibrary>? = null
override internal val _libraries : java.util.HashMap<Any,org.kevoree.TypeLibrary> = java.util.HashMap<Any,org.kevoree.TypeLibrary>()
override internal var _hubs_java_cache :List<org.kevoree.Channel>? = null
override internal val _hubs : java.util.HashMap<Any,org.kevoree.Channel> = java.util.HashMap<Any,org.kevoree.Channel>()
override internal var _mBindings_java_cache :List<org.kevoree.MBinding>? = null
override internal val _mBindings :MutableList<org.kevoree.MBinding> = java.util.ArrayList<org.kevoree.MBinding>()
override internal var _deployUnits_java_cache :List<org.kevoree.DeployUnit>? = null
override internal val _deployUnits : java.util.HashMap<Any,org.kevoree.DeployUnit> = java.util.HashMap<Any,org.kevoree.DeployUnit>()
override internal var _nodeNetworks_java_cache :List<org.kevoree.NodeNetwork>? = null
override internal val _nodeNetworks :MutableList<org.kevoree.NodeNetwork> = java.util.ArrayList<org.kevoree.NodeNetwork>()
override internal var _groups_java_cache :List<org.kevoree.Group>? = null
override internal val _groups : java.util.HashMap<Any,org.kevoree.Group> = java.util.HashMap<Any,org.kevoree.Group>()
override internal var _groupTypes_java_cache :List<org.kevoree.GroupType>? = null
override internal val _groupTypes : java.util.HashMap<Any,org.kevoree.GroupType> = java.util.HashMap<Any,org.kevoree.GroupType>()
override internal var _adaptationPrimitiveTypes_java_cache :List<org.kevoree.AdaptationPrimitiveType>? = null
override internal val _adaptationPrimitiveTypes : java.util.HashMap<Any,org.kevoree.AdaptationPrimitiveType> = java.util.HashMap<Any,org.kevoree.AdaptationPrimitiveType>()
}
