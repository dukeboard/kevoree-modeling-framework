package org.kevoree.impl

import org.kevoree.*

class DictionaryImpl() : DictionaryInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _values_java_cache :List<org.kevoree.DictionaryValue>? = null
override internal val _values :MutableList<org.kevoree.DictionaryValue> = java.util.ArrayList<org.kevoree.DictionaryValue>()
}
