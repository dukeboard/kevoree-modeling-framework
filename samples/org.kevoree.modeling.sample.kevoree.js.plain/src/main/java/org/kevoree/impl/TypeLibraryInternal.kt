package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait TypeLibraryInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.TypeLibrary , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getSubTypes()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _subTypes_java_cache : List<org.kevoree.TypeDefinition>?
internal val _subTypes : java.util.HashMap<Any,org.kevoree.TypeDefinition>
override fun delete(){
_subTypes?.clear()
_subTypes_java_cache = null
}

override fun getSubTypes() : List<org.kevoree.TypeDefinition> {
return if(_subTypes_java_cache != null){
_subTypes_java_cache as List<org.kevoree.TypeDefinition>
} else {
val tempL = java.util.ArrayList<org.kevoree.TypeDefinition>()
tempL.addAll(_subTypes.values().toList())
_subTypes_java_cache = tempL
tempL
}
}

override fun setSubTypes(subTypes : List<org.kevoree.TypeDefinition> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(subTypes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_subTypes_java_cache=null
if(_subTypes!= subTypes){
_subTypes.clear()
for(el in subTypes){
_subTypes.put(el.getName(),el)
}
}

}

override fun addSubTypes(subTypes : org.kevoree.TypeDefinition) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_subTypes_java_cache=null
_subTypes.put(subTypes.getName(),subTypes)
}

override fun addAllSubTypes(subTypes :List<org.kevoree.TypeDefinition>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_subTypes_java_cache=null
for(el in subTypes){
_subTypes.put(el.getName(),el)
}
}


override fun removeSubTypes(subTypes : org.kevoree.TypeDefinition) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_subTypes_java_cache=null
if(_subTypes.size() != 0 && _subTypes.containsKey(subTypes.getName())) {
_subTypes.remove(subTypes.getName())
}
}

override fun removeAllSubTypes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_subTypes_java_cache=null
_subTypes.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createTypeLibrary()
		selfObjectClone.setName(this.getName())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.TypeLibraryInternal
for(sub in this.getSubTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addSubTypes(sub)
} else {
clonedSelfObject.addSubTypes(addrs.get(sub) as org.kevoree.TypeDefinition)
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
override fun findSubTypesByID(key : String) : org.kevoree.TypeDefinition? {
return _subTypes.get(key)
}
override fun findByPath(query : String) : Any? {
val firstSepIndex = query.indexOf('[')
var queryID = ""
var extraReadChar = 2
val relationName = "subTypes"
val optionalDetected = ( firstSepIndex != 8 )
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
"subTypes" -> {
val objFound = findSubTypesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
else -> {}
}
}
}
