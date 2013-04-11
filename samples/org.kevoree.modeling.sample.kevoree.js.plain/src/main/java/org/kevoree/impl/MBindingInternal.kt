package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait MBindingInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.MBinding {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
val subsubsubsubport = this.getPort()
if(subsubsubsubport!= null){ 
subsubsubsubport.setRecursiveReadOnly()
}

val subsubsubsubhub = this.getHub()
if(subsubsubsubhub!= null){ 
subsubsubsubhub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _port : org.kevoree.Port?
internal var _hub : org.kevoree.Channel?
override fun delete(){
_port = null
_hub = null
}

override fun getPort() : org.kevoree.Port? {
return _port
}

override fun setPort(port : org.kevoree.Port? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_port!= port){
_port = (port)
}

}

override fun getHub() : org.kevoree.Channel? {
return _hub
}

override fun setHub(hub : org.kevoree.Channel? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_hub!= hub){
_hub = (hub)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createMBinding()
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.MBindingInternal
if(this.getPort()!=null){
if(mutableOnly && this.getPort()!!.isRecursiveReadOnly()){
clonedSelfObject.setPort(this.getPort()!!)
} else {
clonedSelfObject.setPort(addrs.get(this.getPort()) as org.kevoree.Port)
}
}

if(this.getHub()!=null){
if(mutableOnly && this.getHub()!!.isRecursiveReadOnly()){
clonedSelfObject.setHub(this.getHub()!!)
} else {
clonedSelfObject.setHub(addrs.get(this.getHub()) as org.kevoree.Channel)
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
