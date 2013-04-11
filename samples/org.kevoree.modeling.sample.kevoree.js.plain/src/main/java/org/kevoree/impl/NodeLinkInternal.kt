package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NodeLinkInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.NodeLink {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getNetworkProperties()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _networkType : String
internal var _estimatedRate : Int
internal var _lastCheck : String
internal var _networkProperties_java_cache : List<org.kevoree.NetworkProperty>?
internal val _networkProperties : java.util.HashMap<Any,org.kevoree.NetworkProperty>
override fun delete(){
for(el in _networkProperties){
el.value.delete()
}
_networkProperties?.clear()
_networkProperties_java_cache = null
}
override fun getNetworkType() : String {
 return _networkType
}

 override fun setNetworkType(networkType : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_networkType = networkType
}
override fun getEstimatedRate() : Int {
 return _estimatedRate
}

 override fun setEstimatedRate(estimatedRate : Int) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_estimatedRate = estimatedRate
}
override fun getLastCheck() : String {
 return _lastCheck
}

 override fun setLastCheck(lastCheck : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_lastCheck = lastCheck
}

override fun getNetworkProperties() : List<org.kevoree.NetworkProperty> {
return if(_networkProperties_java_cache != null){
_networkProperties_java_cache as List<org.kevoree.NetworkProperty>
} else {
val tempL = java.util.ArrayList<org.kevoree.NetworkProperty>()
tempL.addAll(_networkProperties.values().toList())
_networkProperties_java_cache = tempL
tempL
}
}

override fun setNetworkProperties(networkProperties : List<org.kevoree.NetworkProperty> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(networkProperties == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_networkProperties_java_cache=null
if(_networkProperties!= networkProperties){
_networkProperties.clear()
for(el in networkProperties){
_networkProperties.put(el.getName(),el)
}
for(elem in networkProperties){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNetworkProperties(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("networkProperties")
}
}

}

override fun addNetworkProperties(networkProperties : org.kevoree.NetworkProperty) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_networkProperties_java_cache=null
(networkProperties as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNetworkProperties(networkProperties)})
(networkProperties as org.kevoree.container.KMFContainerImpl).setContainmentRefName("networkProperties")
_networkProperties.put(networkProperties.getName(),networkProperties)
}

override fun addAllNetworkProperties(networkProperties :List<org.kevoree.NetworkProperty>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_networkProperties_java_cache=null
for(el in networkProperties){
_networkProperties.put(el.getName(),el)
}
for(el in networkProperties){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNetworkProperties(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("networkProperties")
}
}


override fun removeNetworkProperties(networkProperties : org.kevoree.NetworkProperty) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_networkProperties_java_cache=null
if(_networkProperties.size() != 0 && _networkProperties.containsKey(networkProperties.getName())) {
_networkProperties.remove(networkProperties.getName())
(networkProperties!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(networkProperties!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllNetworkProperties() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getNetworkProperties()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_networkProperties_java_cache=null
_networkProperties.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createNodeLink()
		selfObjectClone.setNetworkType(this.getNetworkType())
		selfObjectClone.setEstimatedRate(this.getEstimatedRate())
		selfObjectClone.setLastCheck(this.getLastCheck())
		subResult.put(this,selfObjectClone)
for(sub in this.getNetworkProperties()){
(sub as org.kevoree.impl.NetworkPropertyInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.NodeLinkInternal
for(sub in this.getNetworkProperties()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addNetworkProperties(sub)
} else {
clonedSelfObject.addNetworkProperties(addrs.get(sub) as org.kevoree.NetworkProperty)
}
		}

for(sub in this.getNetworkProperties()){
			(sub as org.kevoree.impl.NetworkPropertyInternal ).resolve(addrs,readOnly,mutableOnly)
		}

		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun path() : String? {
return null
}
override fun findNetworkPropertiesByID(key : String) : org.kevoree.NetworkProperty? {
return _networkProperties.get(key)
}
override fun findByPath(query : String) : Any? {
val firstSepIndex = query.indexOf('[')
var queryID = ""
var extraReadChar = 2
val relationName = "networkProperties"
val optionalDetected = ( firstSepIndex != 17 )
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
"networkProperties" -> {
val objFound = findNetworkPropertiesByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
else -> {}
}
}
}
