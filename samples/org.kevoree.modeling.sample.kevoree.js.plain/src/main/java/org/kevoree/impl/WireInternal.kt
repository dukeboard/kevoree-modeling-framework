package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait WireInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Wire {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getPorts()){
			sub.setRecursiveReadOnly()
		}

setInternalReadOnly()
}
internal var _ports_java_cache : List<org.kevoree.PortTypeRef>?
internal val _ports : java.util.HashMap<Any,org.kevoree.PortTypeRef>
override fun delete(){
_ports?.clear()
_ports_java_cache = null
}

override fun getPorts() : List<org.kevoree.PortTypeRef> {
return if(_ports_java_cache != null){
_ports_java_cache as List<org.kevoree.PortTypeRef>
} else {
val tempL = java.util.ArrayList<org.kevoree.PortTypeRef>()
tempL.addAll(_ports.values().toList())
_ports_java_cache = tempL
tempL
}
}

override fun setPorts(ports : List<org.kevoree.PortTypeRef> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(ports == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_ports_java_cache=null
if(_ports!= ports){
_ports.clear()
for(el in ports){
_ports.put(el.getName(),el)
}
}

}

override fun addPorts(ports : org.kevoree.PortTypeRef) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_ports_java_cache=null
_ports.put(ports.getName(),ports)
}

override fun addAllPorts(ports :List<org.kevoree.PortTypeRef>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_ports_java_cache=null
for(el in ports){
_ports.put(el.getName(),el)
}
}


override fun removePorts(ports : org.kevoree.PortTypeRef) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_ports_java_cache=null
if(_ports.size == 2&& _ports.containsKey(ports.getName()) ) {
throw UnsupportedOperationException("The list of ports must contain at least 2 element. Connot remove sizeof(ports)="+_ports.size)
} else {
_ports.remove(ports.getName())
}
}

override fun removeAllPorts() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_ports_java_cache=null
_ports.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createWire()
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.WireInternal
for(sub in this.getPorts()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addPorts(sub)
} else {
clonedSelfObject.addPorts(addrs.get(sub) as org.kevoree.PortTypeRef)
}
		}

		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun path() : String? {
return null
}
override fun findPortsByID(key : String) : org.kevoree.PortTypeRef? {
return _ports.get(key)
}
override fun findByPath(query : String) : Any? {
val firstSepIndex = query.indexOf('[')
var queryID = ""
var extraReadChar = 2
val relationName = "ports"
val optionalDetected = ( firstSepIndex != 5 )
if(optionalDetected){ extraReadChar = extraReadChar - 2 }
if(query.indexOf('{') == 0){
queryID = query.substring(query.indexOf('{')+1,query.indexOf('}'))
extraReadChar = extraReadChar + 2
} else {
if(optionalDetected){
if(query.indexOf('/') != - 1){
queryID = query.substring(0,query.indexOf('/'))
} else {
queryID = query.substring(0,query.size)
}
} else {
queryID = query.substring(query.indexOf('[')+1,query.indexOf(']'))
}
}
var subquery = query.substring((if(optionalDetected){0} else {relationName.size})+queryID.size+extraReadChar,query.size)
if (subquery.indexOf('/') != -1){
subquery = subquery.substring(subquery.indexOf('/')+1,subquery.size)
}
return when(relationName) {
"ports" -> {
val objFound = findPortsByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
else -> {}
}
}
}
