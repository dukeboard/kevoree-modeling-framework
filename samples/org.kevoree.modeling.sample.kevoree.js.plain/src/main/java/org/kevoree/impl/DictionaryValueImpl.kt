package org.kevoree.impl

import org.kevoree.*

class DictionaryValueImpl() : DictionaryValueInternal {
override internal var internal_eContainer : org.kevoree.container.KMFContainer? = null
override internal var internal_containmentRefName : String? = null
override internal var internal_unsetCmd : (()->Unit)? = null
override internal var internal_readOnlyElem : Boolean = false
override internal var internal_recursive_readOnlyElem : Boolean = false
override internal var _value : String = ""
override internal var _attribute : org.kevoree.DictionaryAttribute? = null
override internal var _targetNode : org.kevoree.ContainerNode? = null
}
