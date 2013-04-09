package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DictionaryInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Dictionary {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getValues()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _values_java_cache : List<org.kevoree.DictionaryValue>?
internal val _values :MutableList<org.kevoree.DictionaryValue>
override fun delete(){
for(el in _values){
el.delete()
}
_values?.clear()
_values_java_cache = null
}

override fun getValues() : List<org.kevoree.DictionaryValue> {
return if(_values_java_cache != null){
_values_java_cache as List<org.kevoree.DictionaryValue>
} else {
val tempL = java.util.ArrayList<org.kevoree.DictionaryValue>()
tempL.addAll(_values)
_values_java_cache = tempL
tempL
}
}

override fun setValues(values : List<org.kevoree.DictionaryValue> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(values == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_values_java_cache=null
if(_values!= values){
_values.clear()
_values.addAll(values)
for(elem in values){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeValues(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("values")
}
}

}

override fun addValues(values : org.kevoree.DictionaryValue) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_values_java_cache=null
(values as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeValues(values)})
(values as org.kevoree.container.KMFContainerImpl).setContainmentRefName("values")
_values.add(values)
}

override fun addAllValues(values :List<org.kevoree.DictionaryValue>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_values_java_cache=null
_values.addAll(values)
for(el in values){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeValues(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("values")
}
}


override fun removeValues(values : org.kevoree.DictionaryValue) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_values_java_cache=null
if(_values.size() != 0 && _values.indexOf(values) != -1 ) {
_values.remove(_values.indexOf(values))
(values!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(values!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllValues() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getValues())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_values_java_cache=null
_values.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createDictionary()
		subResult.put(this,selfObjectClone)
for(sub in this.getValues()){
(sub as org.kevoree.impl.DictionaryValueInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.DictionaryInternal
for(sub in this.getValues()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addValues(sub)
} else {
clonedSelfObject.addValues(addrs.get(sub) as org.kevoree.DictionaryValue)
}
		}

for(sub in this.getValues()){
			(sub as org.kevoree.impl.DictionaryValueInternal ).resolve(addrs,readOnly,mutableOnly)
		}

		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun path() : String? {
return null
}
override fun findByPath(query : String) : Any? {return null}
}
