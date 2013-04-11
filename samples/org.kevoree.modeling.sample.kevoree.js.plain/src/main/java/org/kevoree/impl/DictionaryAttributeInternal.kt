package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DictionaryAttributeInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.DictionaryAttribute , org.kevoree.impl.TypedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getGenericTypes()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _optional : Boolean
internal var _state : Boolean
internal var _datatype : String
internal var _fragmentDependant : Boolean
override fun delete(){
}
override fun getOptional() : Boolean {
 return _optional
}

 override fun setOptional(optional : Boolean) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_optional = optional
}
override fun getState() : Boolean {
 return _state
}

 override fun setState(state : Boolean) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_state = state
}
override fun getDatatype() : String {
 return _datatype
}

 override fun setDatatype(datatype : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_datatype = datatype
}
override fun getFragmentDependant() : Boolean {
 return _fragmentDependant
}

 override fun setFragmentDependant(fragmentDependant : Boolean) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_fragmentDependant = fragmentDependant
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createDictionaryAttribute()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setOptional(this.getOptional())
		selfObjectClone.setState(this.getState())
		selfObjectClone.setDatatype(this.getDatatype())
		selfObjectClone.setFragmentDependant(this.getFragmentDependant())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.DictionaryAttributeInternal
for(sub in this.getGenericTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addGenericTypes(sub)
} else {
clonedSelfObject.addGenericTypes(addrs.get(sub) as org.kevoree.TypedElement)
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
