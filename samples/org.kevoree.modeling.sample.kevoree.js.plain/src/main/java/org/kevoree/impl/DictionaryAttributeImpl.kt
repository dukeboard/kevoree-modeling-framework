package org.kevoree.impl

import org.kevoree.*

class DictionaryAttributeImpl() : DictionaryAttributeInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _name : String = ""
override internal var _optional : Boolean = false
override internal var _state : Boolean = false
override internal var _datatype : String = ""
override internal var _fragmentDependant : Boolean = false
override internal var _genericTypes_java_cache :List<org.kevoree.TypedElement>? = null
override internal val _genericTypes : java.util.HashMap<Any,org.kevoree.TypedElement> = java.util.HashMap<Any,org.kevoree.TypedElement>()
}
