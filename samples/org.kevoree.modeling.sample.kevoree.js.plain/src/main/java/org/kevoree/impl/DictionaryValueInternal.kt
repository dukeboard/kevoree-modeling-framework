package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DictionaryValueInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.DictionaryValue {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
val subsubsubsubattribute = this.getAttribute()
if(subsubsubsubattribute!= null){ 
subsubsubsubattribute.setRecursiveReadOnly()
}

val subsubsubsubtargetNode = this.getTargetNode()
if(subsubsubsubtargetNode!= null){ 
subsubsubsubtargetNode.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _value : String
internal var _attribute : org.kevoree.DictionaryAttribute?
internal var _targetNode : org.kevoree.ContainerNode?
override fun delete(){
_attribute = null
_targetNode = null
}
override fun getValue() : String {
 return _value
}

 override fun setValue(value : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_value = value
}

override fun getAttribute() : org.kevoree.DictionaryAttribute? {
return _attribute
}

override fun setAttribute(attribute : org.kevoree.DictionaryAttribute? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_attribute!= attribute){
_attribute = (attribute)
}

}

override fun getTargetNode() : org.kevoree.ContainerNode? {
return _targetNode
}

override fun setTargetNode(targetNode : org.kevoree.ContainerNode? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_targetNode!= targetNode){
_targetNode = (targetNode)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createDictionaryValue()
		selfObjectClone.setValue(this.getValue())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.DictionaryValueInternal
if(this.getAttribute()!=null){
if(mutableOnly && this.getAttribute()!!.isRecursiveReadOnly()){
clonedSelfObject.setAttribute(this.getAttribute()!!)
} else {
clonedSelfObject.setAttribute(addrs.get(this.getAttribute()) as org.kevoree.DictionaryAttribute)
}
}

if(this.getTargetNode()!=null){
if(mutableOnly && this.getTargetNode()!!.isRecursiveReadOnly()){
clonedSelfObject.setTargetNode(this.getTargetNode()!!)
} else {
clonedSelfObject.setTargetNode(addrs.get(this.getTargetNode()) as org.kevoree.ContainerNode)
}
}

		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun path() : String? {
return null
}
override fun findByPath(query : String) : Any? {return null}
}
