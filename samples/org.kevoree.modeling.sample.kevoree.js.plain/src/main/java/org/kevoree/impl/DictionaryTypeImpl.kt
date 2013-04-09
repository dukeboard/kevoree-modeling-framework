package org.kevoree.impl

import org.kevoree.*

class DictionaryTypeImpl() : DictionaryTypeInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _attributes_java_cache :List<org.kevoree.DictionaryAttribute>? = null
override internal val _attributes : java.util.HashMap<Any,org.kevoree.DictionaryAttribute> = java.util.HashMap<Any,org.kevoree.DictionaryAttribute>()
override internal var _defaultValues_java_cache :List<org.kevoree.DictionaryValue>? = null
override internal val _defaultValues :MutableList<org.kevoree.DictionaryValue> = java.util.ArrayList<org.kevoree.DictionaryValue>()
}
