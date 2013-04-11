package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait IntegrationPatternInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.IntegrationPattern , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getExtraFonctionalProperties()){
sub.setRecursiveReadOnly()
}

for(sub in this.getPortTypes()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _extraFonctionalProperties_java_cache : List<org.kevoree.ExtraFonctionalProperty>?
internal val _extraFonctionalProperties :MutableList<org.kevoree.ExtraFonctionalProperty>
internal var _portTypes_java_cache : List<org.kevoree.PortTypeRef>?
internal val _portTypes : java.util.HashMap<Any,org.kevoree.PortTypeRef>
override fun delete(){
for(el in _extraFonctionalProperties){
el.delete()
}
_extraFonctionalProperties?.clear()
_extraFonctionalProperties_java_cache = null
_portTypes?.clear()
_portTypes_java_cache = null
}

override fun getExtraFonctionalProperties() : List<org.kevoree.ExtraFonctionalProperty> {
return if(_extraFonctionalProperties_java_cache != null){
_extraFonctionalProperties_java_cache as List<org.kevoree.ExtraFonctionalProperty>
} else {
val tempL = java.util.ArrayList<org.kevoree.ExtraFonctionalProperty>()
tempL.addAll(_extraFonctionalProperties)
_extraFonctionalProperties_java_cache = tempL
tempL
}
}

override fun setExtraFonctionalProperties(extraFonctionalProperties : List<org.kevoree.ExtraFonctionalProperty> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(extraFonctionalProperties == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_extraFonctionalProperties_java_cache=null
if(_extraFonctionalProperties!= extraFonctionalProperties){
_extraFonctionalProperties.clear()
_extraFonctionalProperties.addAll(extraFonctionalProperties)
for(elem in extraFonctionalProperties){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeExtraFonctionalProperties(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("extraFonctionalProperties")
}
}

}

override fun addExtraFonctionalProperties(extraFonctionalProperties : org.kevoree.ExtraFonctionalProperty) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_extraFonctionalProperties_java_cache=null
(extraFonctionalProperties as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeExtraFonctionalProperties(extraFonctionalProperties)})
(extraFonctionalProperties as org.kevoree.container.KMFContainerImpl).setContainmentRefName("extraFonctionalProperties")
_extraFonctionalProperties.add(extraFonctionalProperties)
}

override fun addAllExtraFonctionalProperties(extraFonctionalProperties :List<org.kevoree.ExtraFonctionalProperty>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_extraFonctionalProperties_java_cache=null
_extraFonctionalProperties.addAll(extraFonctionalProperties)
for(el in extraFonctionalProperties){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeExtraFonctionalProperties(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("extraFonctionalProperties")
}
}


override fun removeExtraFonctionalProperties(extraFonctionalProperties : org.kevoree.ExtraFonctionalProperty) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_extraFonctionalProperties_java_cache=null
if(_extraFonctionalProperties.size() != 0 && _extraFonctionalProperties.indexOf(extraFonctionalProperties) != -1 ) {
_extraFonctionalProperties.remove(_extraFonctionalProperties.indexOf(extraFonctionalProperties))
(extraFonctionalProperties!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(extraFonctionalProperties!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllExtraFonctionalProperties() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getExtraFonctionalProperties())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_extraFonctionalProperties_java_cache=null
_extraFonctionalProperties.clear()
}

override fun getPortTypes() : List<org.kevoree.PortTypeRef> {
return if(_portTypes_java_cache != null){
_portTypes_java_cache as List<org.kevoree.PortTypeRef>
} else {
val tempL = java.util.ArrayList<org.kevoree.PortTypeRef>()
tempL.addAll(_portTypes.values().toList())
_portTypes_java_cache = tempL
tempL
}
}

override fun setPortTypes(portTypes : List<org.kevoree.PortTypeRef> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(portTypes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_portTypes_java_cache=null
if(_portTypes!= portTypes){
_portTypes.clear()
for(el in portTypes){
_portTypes.put(el.getName(),el)
}
}

}

override fun addPortTypes(portTypes : org.kevoree.PortTypeRef) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_portTypes_java_cache=null
_portTypes.put(portTypes.getName(),portTypes)
}

override fun addAllPortTypes(portTypes :List<org.kevoree.PortTypeRef>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_portTypes_java_cache=null
for(el in portTypes){
_portTypes.put(el.getName(),el)
}
}


override fun removePortTypes(portTypes : org.kevoree.PortTypeRef) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_portTypes_java_cache=null
if(_portTypes.size() != 0 && _portTypes.containsKey(portTypes.getName())) {
_portTypes.remove(portTypes.getName())
}
}

override fun removeAllPortTypes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_portTypes_java_cache=null
_portTypes.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createIntegrationPattern()
		selfObjectClone.setName(this.getName())
		subResult.put(this,selfObjectClone)
for(sub in this.getExtraFonctionalProperties()){
(sub as org.kevoree.impl.ExtraFonctionalPropertyInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.IntegrationPatternInternal
for(sub in this.getExtraFonctionalProperties()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addExtraFonctionalProperties(sub)
} else {
clonedSelfObject.addExtraFonctionalProperties(addrs.get(sub) as org.kevoree.ExtraFonctionalProperty)
}
		}

for(sub in this.getPortTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addPortTypes(sub)
} else {
clonedSelfObject.addPortTypes(addrs.get(sub) as org.kevoree.PortTypeRef)
}
		}

for(sub in this.getExtraFonctionalProperties()){
			(sub as org.kevoree.impl.ExtraFonctionalPropertyInternal ).resolve(addrs,readOnly,mutableOnly)
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
override fun findPortTypesByID(key : String) : org.kevoree.PortTypeRef? {
return _portTypes.get(key)
}
override fun findByPath(query : String) : Any? {
val firstSepIndex = query.indexOf('[')
var queryID = ""
var extraReadChar = 2
val relationName = "portTypes"
val optionalDetected = ( firstSepIndex != 9 )
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
"portTypes" -> {
val objFound = findPortTypesByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
else -> {}
}
}
}
