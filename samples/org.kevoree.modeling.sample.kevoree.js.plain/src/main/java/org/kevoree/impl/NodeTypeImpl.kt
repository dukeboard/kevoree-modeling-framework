package org.kevoree.impl

import org.kevoree.*

class NodeTypeImpl() : NodeTypeInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _factoryBean : String = ""
override internal var _bean : String = ""
override internal var _startMethod : String = ""
override internal var _stopMethod : String = ""
override internal var _updateMethod : String = ""
override internal var _deployUnits_java_cache :List<org.kevoree.DeployUnit>? = null
override internal val _deployUnits : java.util.HashMap<Any,org.kevoree.DeployUnit> = java.util.HashMap<Any,org.kevoree.DeployUnit>()
override internal var _dictionaryType : org.kevoree.DictionaryType? = null
override internal var _superTypes_java_cache :List<org.kevoree.TypeDefinition>? = null
override internal val _superTypes : java.util.HashMap<Any,org.kevoree.TypeDefinition> = java.util.HashMap<Any,org.kevoree.TypeDefinition>()
override internal var _managedPrimitiveTypes_java_cache :List<org.kevoree.AdaptationPrimitiveType>? = null
override internal val _managedPrimitiveTypes : java.util.HashMap<Any,org.kevoree.AdaptationPrimitiveType> = java.util.HashMap<Any,org.kevoree.AdaptationPrimitiveType>()
}
