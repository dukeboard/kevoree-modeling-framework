package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DictionaryTypeInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.DictionaryType {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getAttributes()){
sub.setRecursiveReadOnly()
}

for(sub in this.getDefaultValues()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _attributes_java_cache : List<org.kevoree.DictionaryAttribute>?
internal val _attributes : java.util.HashMap<Any,org.kevoree.DictionaryAttribute>
internal var _defaultValues_java_cache : List<org.kevoree.DictionaryValue>?
internal val _defaultValues :MutableList<org.kevoree.DictionaryValue>
override fun delete(){
for(el in _attributes){
el.value.delete()
}
for(el in _defaultValues){
el.delete()
}
_attributes?.clear()
_attributes_java_cache = null
_defaultValues?.clear()
_defaultValues_java_cache = null
}

override fun getAttributes() : List<org.kevoree.DictionaryAttribute> {
return if(_attributes_java_cache != null){
_attributes_java_cache as List<org.kevoree.DictionaryAttribute>
} else {
val tempL = java.util.ArrayList<org.kevoree.DictionaryAttribute>()
tempL.addAll(_attributes.values().toList())
_attributes_java_cache = tempL
tempL
}
}

override fun setAttributes(attributes : List<org.kevoree.DictionaryAttribute> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(attributes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_attributes_java_cache=null
if(_attributes!= attributes){
_attributes.clear()
for(el in attributes){
_attributes.put(el.getName(),el)
}
for(elem in attributes){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeAttributes(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("attributes")
}
}

}

override fun addAttributes(attributes : org.kevoree.DictionaryAttribute) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_attributes_java_cache=null
(attributes as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeAttributes(attributes)})
(attributes as org.kevoree.container.KMFContainerImpl).setContainmentRefName("attributes")
_attributes.put(attributes.getName(),attributes)
}

override fun addAllAttributes(attributes :List<org.kevoree.DictionaryAttribute>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_attributes_java_cache=null
for(el in attributes){
_attributes.put(el.getName(),el)
}
for(el in attributes){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeAttributes(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("attributes")
}
}


override fun removeAttributes(attributes : org.kevoree.DictionaryAttribute) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_attributes_java_cache=null
if(_attributes.size() != 0 && _attributes.containsKey(attributes.getName())) {
_attributes.remove(attributes.getName())
(attributes!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(attributes!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllAttributes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getAttributes()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_attributes_java_cache=null
_attributes.clear()
}

override fun getDefaultValues() : List<org.kevoree.DictionaryValue> {
return if(_defaultValues_java_cache != null){
_defaultValues_java_cache as List<org.kevoree.DictionaryValue>
} else {
val tempL = java.util.ArrayList<org.kevoree.DictionaryValue>()
tempL.addAll(_defaultValues)
_defaultValues_java_cache = tempL
tempL
}
}

override fun setDefaultValues(defaultValues : List<org.kevoree.DictionaryValue> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(defaultValues == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_defaultValues_java_cache=null
if(_defaultValues!= defaultValues){
_defaultValues.clear()
_defaultValues.addAll(defaultValues)
for(elem in defaultValues){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDefaultValues(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("defaultValues")
}
}

}

override fun addDefaultValues(defaultValues : org.kevoree.DictionaryValue) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_defaultValues_java_cache=null
(defaultValues as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDefaultValues(defaultValues)})
(defaultValues as org.kevoree.container.KMFContainerImpl).setContainmentRefName("defaultValues")
_defaultValues.add(defaultValues)
}

override fun addAllDefaultValues(defaultValues :List<org.kevoree.DictionaryValue>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_defaultValues_java_cache=null
_defaultValues.addAll(defaultValues)
for(el in defaultValues){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDefaultValues(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("defaultValues")
}
}


override fun removeDefaultValues(defaultValues : org.kevoree.DictionaryValue) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_defaultValues_java_cache=null
if(_defaultValues.size() != 0 && _defaultValues.indexOf(defaultValues) != -1 ) {
_defaultValues.remove(_defaultValues.indexOf(defaultValues))
(defaultValues!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(defaultValues!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllDefaultValues() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getDefaultValues())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_defaultValues_java_cache=null
_defaultValues.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createDictionaryType()
		subResult.put(this,selfObjectClone)
for(sub in this.getAttributes()){
(sub as org.kevoree.impl.DictionaryAttributeInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getDefaultValues()){
(sub as org.kevoree.impl.DictionaryValueInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.DictionaryTypeInternal
for(sub in this.getAttributes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addAttributes(sub)
} else {
clonedSelfObject.addAttributes(addrs.get(sub) as org.kevoree.DictionaryAttribute)
}
		}

for(sub in this.getDefaultValues()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addDefaultValues(sub)
} else {
clonedSelfObject.addDefaultValues(addrs.get(sub) as org.kevoree.DictionaryValue)
}
		}

for(sub in this.getAttributes()){
			(sub as org.kevoree.impl.DictionaryAttributeInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getDefaultValues()){
			(sub as org.kevoree.impl.DictionaryValueInternal ).resolve(addrs,readOnly,mutableOnly)
		}

		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun path() : String? {
return null
}
override fun findAttributesByID(key : String) : org.kevoree.DictionaryAttribute? {
return _attributes.get(key)
}
override fun findByPath(query : String) : Any? {
val firstSepIndex = query.indexOf('[')
var queryID = ""
var extraReadChar = 2
val relationName = "attributes"
val optionalDetected = ( firstSepIndex != 10 )
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
"attributes" -> {
val objFound = findAttributesByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
else -> {}
}
}
}
