package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait TypedElementInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.TypedElement , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getGenericTypes()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _genericTypes_java_cache : List<org.kevoree.TypedElement>?
internal val _genericTypes : java.util.HashMap<Any,org.kevoree.TypedElement>
override fun delete(){
_genericTypes?.clear()
_genericTypes_java_cache = null
}

override fun getGenericTypes() : List<org.kevoree.TypedElement> {
return if(_genericTypes_java_cache != null){
_genericTypes_java_cache as List<org.kevoree.TypedElement>
} else {
val tempL = java.util.ArrayList<org.kevoree.TypedElement>()
tempL.addAll(_genericTypes.values().toList())
_genericTypes_java_cache = tempL
tempL
}
}

override fun setGenericTypes(genericTypes : List<org.kevoree.TypedElement> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(genericTypes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_genericTypes_java_cache=null
if(_genericTypes!= genericTypes){
_genericTypes.clear()
for(el in genericTypes){
_genericTypes.put(el.getName(),el)
}
}

}

override fun addGenericTypes(genericTypes : org.kevoree.TypedElement) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_genericTypes_java_cache=null
_genericTypes.put(genericTypes.getName(),genericTypes)
}

override fun addAllGenericTypes(genericTypes :List<org.kevoree.TypedElement>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_genericTypes_java_cache=null
for(el in genericTypes){
_genericTypes.put(el.getName(),el)
}
}


override fun removeGenericTypes(genericTypes : org.kevoree.TypedElement) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_genericTypes_java_cache=null
if(_genericTypes.size() != 0 && _genericTypes.containsKey(genericTypes.getName())) {
_genericTypes.remove(genericTypes.getName())
}
}

override fun removeAllGenericTypes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_genericTypes_java_cache=null
_genericTypes.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createTypedElement()
		selfObjectClone.setName(this.getName())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.TypedElementInternal
for(sub in this.getGenericTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addGenericTypes(sub)
} else {
clonedSelfObject.addGenericTypes(addrs.get(sub) as org.kevoree.TypedElement)
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
override fun findGenericTypesByID(key : String) : org.kevoree.TypedElement? {
return _genericTypes.get(key)
}
override fun findByPath(query : String) : Any? {
val firstSepIndex = query.indexOf('[')
var queryID = ""
var extraReadChar = 2
val relationName = "genericTypes"
val optionalDetected = ( firstSepIndex != 12 )
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
"genericTypes" -> {
val objFound = findGenericTypesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
else -> {}
}
}
}
