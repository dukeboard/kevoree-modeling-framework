package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NetworkPropertyInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.NetworkProperty , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
setInternalReadOnly()
}
internal var _value : String
internal var _lastCheck : String
override fun delete(){
}
override fun getValue() : String {
 return _value
}

 override fun setValue(value : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_value = value
}
override fun getLastCheck() : String {
 return _lastCheck
}

 override fun setLastCheck(lastCheck : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_lastCheck = lastCheck
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createNetworkProperty()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setValue(this.getValue())
		selfObjectClone.setLastCheck(this.getLastCheck())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.NetworkPropertyInternal
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
