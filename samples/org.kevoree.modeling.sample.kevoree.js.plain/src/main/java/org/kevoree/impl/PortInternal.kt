package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait PortInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Port {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
val subsubsubsubportTypeRef = this.getPortTypeRef()
if(subsubsubsubportTypeRef!= null){ 
subsubsubsubportTypeRef.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _portTypeRef : org.kevoree.PortTypeRef?
override fun delete(){
_portTypeRef = null
}

override fun getPortTypeRef() : org.kevoree.PortTypeRef? {
return _portTypeRef
}

override fun setPortTypeRef(portTypeRef : org.kevoree.PortTypeRef? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_portTypeRef!= portTypeRef){
_portTypeRef = (portTypeRef)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createPort()
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.PortInternal
if(this.getPortTypeRef()!=null){
if(mutableOnly && this.getPortTypeRef()!!.isRecursiveReadOnly()){
clonedSelfObject.setPortTypeRef(this.getPortTypeRef()!!)
} else {
clonedSelfObject.setPortTypeRef(addrs.get(this.getPortTypeRef()) as org.kevoree.PortTypeRef)
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
