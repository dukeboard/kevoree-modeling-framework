package org.kevoree.impl

import org.kevoree.*

class MessagePortTypeImpl() : MessagePortTypeInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _factoryBean : String = ""
override internal var _bean : String = ""
override internal var _synchrone : Boolean = false
override internal var _deployUnits_java_cache :List<org.kevoree.DeployUnit>? = null
override internal val _deployUnits : java.util.HashMap<Any,org.kevoree.DeployUnit> = java.util.HashMap<Any,org.kevoree.DeployUnit>()
override internal var _dictionaryType : org.kevoree.DictionaryType? = null
override internal var _superTypes_java_cache :List<org.kevoree.TypeDefinition>? = null
override internal val _superTypes : java.util.HashMap<Any,org.kevoree.TypeDefinition> = java.util.HashMap<Any,org.kevoree.TypeDefinition>()
override internal var _filters_java_cache :List<org.kevoree.TypedElement>? = null
override internal val _filters : java.util.HashMap<Any,org.kevoree.TypedElement> = java.util.HashMap<Any,org.kevoree.TypedElement>()
}
