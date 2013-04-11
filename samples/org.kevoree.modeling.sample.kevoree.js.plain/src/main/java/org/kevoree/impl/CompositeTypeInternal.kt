package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait CompositeTypeInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.CompositeType , org.kevoree.impl.ComponentTypeInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getDeployUnits()){
sub.setRecursiveReadOnly()
}

val subsubsubsubdictionaryType = this.getDictionaryType()
if(subsubsubsubdictionaryType!= null){ 
subsubsubsubdictionaryType.setRecursiveReadOnly()
}

for(sub in this.getSuperTypes()){
sub.setRecursiveReadOnly()
}

for(sub in this.getRequired()){
sub.setRecursiveReadOnly()
}

for(sub in this.getIntegrationPatterns()){
sub.setRecursiveReadOnly()
}

val subsubsubsubextraFonctionalProperties = this.getExtraFonctionalProperties()
if(subsubsubsubextraFonctionalProperties!= null){ 
subsubsubsubextraFonctionalProperties.setRecursiveReadOnly()
}

for(sub in this.getProvided()){
sub.setRecursiveReadOnly()
}

for(sub in this.getChilds()){
sub.setRecursiveReadOnly()
}

for(sub in this.getWires()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _childs_java_cache : List<org.kevoree.ComponentType>?
internal val _childs : java.util.HashMap<Any,org.kevoree.ComponentType>
internal var _wires_java_cache : List<org.kevoree.Wire>?
internal val _wires :MutableList<org.kevoree.Wire>
override fun delete(){
_dictionaryType?.delete()
for(el in _required){
el.value.delete()
}
for(el in _integrationPatterns){
el.value.delete()
}
_extraFonctionalProperties?.delete()
for(el in _provided){
el.value.delete()
}
for(el in _wires){
el.delete()
}
_childs?.clear()
_childs_java_cache = null
_wires?.clear()
_wires_java_cache = null
}

override fun getChilds() : List<org.kevoree.ComponentType> {
return if(_childs_java_cache != null){
_childs_java_cache as List<org.kevoree.ComponentType>
} else {
val tempL = java.util.ArrayList<org.kevoree.ComponentType>()
tempL.addAll(_childs.values().toList())
_childs_java_cache = tempL
tempL
}
}

override fun setChilds(childs : List<org.kevoree.ComponentType> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(childs == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_childs_java_cache=null
if(_childs!= childs){
_childs.clear()
for(el in childs){
_childs.put(el.getName(),el)
}
}

}

override fun addChilds(childs : org.kevoree.ComponentType) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_childs_java_cache=null
_childs.put(childs.getName(),childs)
}

override fun addAllChilds(childs :List<org.kevoree.ComponentType>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_childs_java_cache=null
for(el in childs){
_childs.put(el.getName(),el)
}
}


override fun removeChilds(childs : org.kevoree.ComponentType) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_childs_java_cache=null
if(_childs.size() != 0 && _childs.containsKey(childs.getName())) {
_childs.remove(childs.getName())
}
}

override fun removeAllChilds() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_childs_java_cache=null
_childs.clear()
}

override fun getWires() : List<org.kevoree.Wire> {
return if(_wires_java_cache != null){
_wires_java_cache as List<org.kevoree.Wire>
} else {
val tempL = java.util.ArrayList<org.kevoree.Wire>()
tempL.addAll(_wires)
_wires_java_cache = tempL
tempL
}
}

override fun setWires(wires : List<org.kevoree.Wire> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(wires == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_wires_java_cache=null
if(_wires!= wires){
_wires.clear()
_wires.addAll(wires)
for(elem in wires){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeWires(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("wires")
}
}

}

override fun addWires(wires : org.kevoree.Wire) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_wires_java_cache=null
(wires as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeWires(wires)})
(wires as org.kevoree.container.KMFContainerImpl).setContainmentRefName("wires")
_wires.add(wires)
}

override fun addAllWires(wires :List<org.kevoree.Wire>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_wires_java_cache=null
_wires.addAll(wires)
for(el in wires){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeWires(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("wires")
}
}


override fun removeWires(wires : org.kevoree.Wire) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_wires_java_cache=null
if(_wires.size() != 0 && _wires.indexOf(wires) != -1 ) {
_wires.remove(_wires.indexOf(wires))
(wires!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(wires!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllWires() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getWires())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_wires_java_cache=null
_wires.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createCompositeType()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setFactoryBean(this.getFactoryBean())
		selfObjectClone.setBean(this.getBean())
		selfObjectClone.setStartMethod(this.getStartMethod())
		selfObjectClone.setStopMethod(this.getStopMethod())
		selfObjectClone.setUpdateMethod(this.getUpdateMethod())
		subResult.put(this,selfObjectClone)
val subsubsubsubdictionaryType = this.getDictionaryType()
if(subsubsubsubdictionaryType!= null){ 
(subsubsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal ).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getRequired()){
(sub as org.kevoree.impl.PortTypeRefInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getIntegrationPatterns()){
(sub as org.kevoree.impl.IntegrationPatternInternal).getClonelazy(subResult, _factories,mutableOnly)
}

val subsubsubsubextraFonctionalProperties = this.getExtraFonctionalProperties()
if(subsubsubsubextraFonctionalProperties!= null){ 
(subsubsubsubextraFonctionalProperties as org.kevoree.impl.ExtraFonctionalPropertyInternal ).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getProvided()){
(sub as org.kevoree.impl.PortTypeRefInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getWires()){
(sub as org.kevoree.impl.WireInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.CompositeTypeInternal
for(sub in this.getDeployUnits()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addDeployUnits(sub)
} else {
clonedSelfObject.addDeployUnits(addrs.get(sub) as org.kevoree.DeployUnit)
}
		}

if(this.getDictionaryType()!=null){
if(mutableOnly && this.getDictionaryType()!!.isRecursiveReadOnly()){
clonedSelfObject.setDictionaryType(this.getDictionaryType()!!)
} else {
clonedSelfObject.setDictionaryType(addrs.get(this.getDictionaryType()) as org.kevoree.DictionaryType)
}
}

for(sub in this.getSuperTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addSuperTypes(sub)
} else {
clonedSelfObject.addSuperTypes(addrs.get(sub) as org.kevoree.TypeDefinition)
}
		}

for(sub in this.getRequired()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addRequired(sub)
} else {
clonedSelfObject.addRequired(addrs.get(sub) as org.kevoree.PortTypeRef)
}
		}

for(sub in this.getIntegrationPatterns()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addIntegrationPatterns(sub)
} else {
clonedSelfObject.addIntegrationPatterns(addrs.get(sub) as org.kevoree.IntegrationPattern)
}
		}

if(this.getExtraFonctionalProperties()!=null){
if(mutableOnly && this.getExtraFonctionalProperties()!!.isRecursiveReadOnly()){
clonedSelfObject.setExtraFonctionalProperties(this.getExtraFonctionalProperties()!!)
} else {
clonedSelfObject.setExtraFonctionalProperties(addrs.get(this.getExtraFonctionalProperties()) as org.kevoree.ExtraFonctionalProperty)
}
}

for(sub in this.getProvided()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addProvided(sub)
} else {
clonedSelfObject.addProvided(addrs.get(sub) as org.kevoree.PortTypeRef)
}
		}

for(sub in this.getChilds()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addChilds(sub)
} else {
clonedSelfObject.addChilds(addrs.get(sub) as org.kevoree.ComponentType)
}
		}

for(sub in this.getWires()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addWires(sub)
} else {
clonedSelfObject.addWires(addrs.get(sub) as org.kevoree.Wire)
}
		}

val subsubsubdictionaryType = this.getDictionaryType()
if(subsubsubdictionaryType!=null){ 
(subsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal).resolve(addrs,readOnly,mutableOnly)
}

for(sub in this.getRequired()){
			(sub as org.kevoree.impl.PortTypeRefInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getIntegrationPatterns()){
			(sub as org.kevoree.impl.IntegrationPatternInternal ).resolve(addrs,readOnly,mutableOnly)
		}

val subsubsubextraFonctionalProperties = this.getExtraFonctionalProperties()
if(subsubsubextraFonctionalProperties!=null){ 
(subsubsubextraFonctionalProperties as org.kevoree.impl.ExtraFonctionalPropertyInternal).resolve(addrs,readOnly,mutableOnly)
}

for(sub in this.getProvided()){
			(sub as org.kevoree.impl.PortTypeRefInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getWires()){
			(sub as org.kevoree.impl.WireInternal ).resolve(addrs,readOnly,mutableOnly)
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
override fun findChildsByID(key : String) : org.kevoree.ComponentType? {
return _childs.get(key)
}
override fun findByPath(query : String) : Any? {
val firstSepIndex = query.indexOf('[')
var queryID = ""
var extraReadChar = 2
val relationName = query.substring(0,query.indexOf('['))
if(query.indexOf('{') == firstSepIndex +1){
queryID = query.substring(query.indexOf('{')+1,query.indexOf('}'))
extraReadChar = extraReadChar + 2
} else {
queryID = query.substring(query.indexOf('[')+1,query.indexOf(']'))
}
var subquery = query.substring(relationName.size+queryID.size+extraReadChar,query.size)
if (subquery.indexOf('/') != -1){
subquery = subquery.substring(subquery.indexOf('/')+1,subquery.size)
}
return when(relationName) {
"deployUnits" -> {
val objFound = findDeployUnitsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"superTypes" -> {
val objFound = findSuperTypesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"required" -> {
val objFound = findRequiredByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
"integrationPatterns" -> {
val objFound = findIntegrationPatternsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"provided" -> {
val objFound = findProvidedByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
"childs" -> {
val objFound = findChildsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
else -> {}
}
}
}
