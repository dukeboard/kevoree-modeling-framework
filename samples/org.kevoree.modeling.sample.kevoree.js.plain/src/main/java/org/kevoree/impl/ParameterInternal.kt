package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ParameterInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Parameter , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
val subsubsubsubtype = this.getType()
if(subsubsubsubtype!= null){ 
subsubsubsubtype.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _type : org.kevoree.TypedElement?
override fun delete(){
_type = null
}

override fun getType() : org.kevoree.TypedElement? {
return _type
}

override fun setType(`type` : org.kevoree.TypedElement? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_type!= `type`){
_type = (`type`)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createParameter()
		selfObjectClone.setName(this.getName())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.ParameterInternal
if(this.getType()!=null){
if(mutableOnly && this.getType()!!.isRecursiveReadOnly()){
clonedSelfObject.setType(this.getType()!!)
} else {
clonedSelfObject.setType(addrs.get(this.getType()) as org.kevoree.TypedElement)
}
}

		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun internalGetKey() : String {
return getName()}
override fun path() : String? {
val container = eContainer()
if(container != null) {
val parentPath = container.path()
return  if(parentPath == null){""}else{parentPath + "/"} + internal_containmentRefName + "["+internalGetKey()+"]"
} else {
return null
}
}
}
