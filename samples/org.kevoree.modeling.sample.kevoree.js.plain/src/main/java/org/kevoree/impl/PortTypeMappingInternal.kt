package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait PortTypeMappingInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.PortTypeMapping {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
setInternalReadOnly()
}
internal var _beanMethodName : String
internal var _serviceMethodName : String
override fun delete(){
}
override fun getBeanMethodName() : String {
 return _beanMethodName
}

 override fun setBeanMethodName(beanMethodName : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_beanMethodName = beanMethodName
}
override fun getServiceMethodName() : String {
 return _serviceMethodName
}

 override fun setServiceMethodName(serviceMethodName : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_serviceMethodName = serviceMethodName
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createPortTypeMapping()
		selfObjectClone.setBeanMethodName(this.getBeanMethodName())
		selfObjectClone.setServiceMethodName(this.getServiceMethodName())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.PortTypeMappingInternal
		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun path() : String? {
return null
}
override fun findByPath(query : String) : Any? {return null}
}
