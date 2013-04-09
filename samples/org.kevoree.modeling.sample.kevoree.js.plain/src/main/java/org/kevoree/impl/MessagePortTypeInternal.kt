package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait MessagePortTypeInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.MessagePortType , org.kevoree.impl.PortTypeInternal {
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

for(sub in this.getFilters()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _filters_java_cache : List<org.kevoree.TypedElement>?
internal val _filters : java.util.HashMap<Any,org.kevoree.TypedElement>
override fun delete(){
_dictionaryType?.delete()
_filters?.clear()
_filters_java_cache = null
}

override fun getFilters() : List<org.kevoree.TypedElement> {
return if(_filters_java_cache != null){
_filters_java_cache as List<org.kevoree.TypedElement>
} else {
val tempL = java.util.ArrayList<org.kevoree.TypedElement>()
tempL.addAll(_filters.values().toList())
_filters_java_cache = tempL
tempL
}
}

override fun setFilters(filters : List<org.kevoree.TypedElement> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(filters == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_filters_java_cache=null
if(_filters!= filters){
_filters.clear()
for(el in filters){
_filters.put(el.getName(),el)
}
}

}

override fun addFilters(filters : org.kevoree.TypedElement) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_filters_java_cache=null
_filters.put(filters.getName(),filters)
}

override fun addAllFilters(filters :List<org.kevoree.TypedElement>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_filters_java_cache=null
for(el in filters){
_filters.put(el.getName(),el)
}
}


override fun removeFilters(filters : org.kevoree.TypedElement) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_filters_java_cache=null
if(_filters.size() != 0 && _filters.containsKey(filters.getName())) {
_filters.remove(filters.getName())
}
}

override fun removeAllFilters() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_filters_java_cache=null
_filters.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createMessagePortType()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setFactoryBean(this.getFactoryBean())
		selfObjectClone.setBean(this.getBean())
		selfObjectClone.setSynchrone(this.getSynchrone())
		subResult.put(this,selfObjectClone)
val subsubsubsubdictionaryType = this.getDictionaryType()
if(subsubsubsubdictionaryType!= null){ 
(subsubsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal ).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.MessagePortTypeInternal
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

for(sub in this.getFilters()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addFilters(sub)
} else {
clonedSelfObject.addFilters(addrs.get(sub) as org.kevoree.TypedElement)
}
		}

val subsubsubdictionaryType = this.getDictionaryType()
if(subsubsubdictionaryType!=null){ 
(subsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal).resolve(addrs,readOnly,mutableOnly)
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
override fun findFiltersByID(key : String) : org.kevoree.TypedElement? {
return _filters.get(key)
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
"filters" -> {
val objFound = findFiltersByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
else -> {}
}
}
}
