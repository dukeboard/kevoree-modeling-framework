package org.kevoree.impl

import org.kevoree.*

class DeployUnitImpl() : DeployUnitInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _groupName : String = ""
override internal var _unitName : String = ""
override internal var _version : String = ""
override internal var _url : String = ""
override internal var _hashcode : String = ""
override internal var _type : String = ""
override internal var _requiredLibs_java_cache :List<org.kevoree.DeployUnit>? = null
override internal val _requiredLibs : java.util.HashMap<Any,org.kevoree.DeployUnit> = java.util.HashMap<Any,org.kevoree.DeployUnit>()
override internal var _targetNodeType : org.kevoree.NodeType? = null
}
