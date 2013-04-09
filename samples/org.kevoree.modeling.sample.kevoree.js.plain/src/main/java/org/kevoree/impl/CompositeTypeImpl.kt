package org.kevoree.impl

import org.kevoree.*

class CompositeTypeImpl() : CompositeTypeInternal {
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
override internal var _required_java_cache :List<org.kevoree.PortTypeRef>? = null
override internal val _required : java.util.HashMap<Any,org.kevoree.PortTypeRef> = java.util.HashMap<Any,org.kevoree.PortTypeRef>()
override internal var _integrationPatterns_java_cache :List<org.kevoree.IntegrationPattern>? = null
override internal val _integrationPatterns : java.util.HashMap<Any,org.kevoree.IntegrationPattern> = java.util.HashMap<Any,org.kevoree.IntegrationPattern>()
override internal var _extraFonctionalProperties : org.kevoree.ExtraFonctionalProperty? = null
override internal var _provided_java_cache :List<org.kevoree.PortTypeRef>? = null
override internal val _provided : java.util.HashMap<Any,org.kevoree.PortTypeRef> = java.util.HashMap<Any,org.kevoree.PortTypeRef>()
override internal var _childs_java_cache :List<org.kevoree.ComponentType>? = null
override internal val _childs : java.util.HashMap<Any,org.kevoree.ComponentType> = java.util.HashMap<Any,org.kevoree.ComponentType>()
override internal var _wires_java_cache :List<org.kevoree.Wire>? = null
override internal val _wires :MutableList<org.kevoree.Wire> = java.util.ArrayList<org.kevoree.Wire>()
}
