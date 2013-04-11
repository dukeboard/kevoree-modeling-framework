package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ComponentInstanceInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.ComponentInstance , org.kevoree.impl.NamedElementInternal , org.kevoree.impl.InstanceInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
val subsubsubsubtypeDefinition = this.getTypeDefinition()
if(subsubsubsubtypeDefinition!= null){ 
subsubsubsubtypeDefinition.setRecursiveReadOnly()
}

val subsubsubsubdictionary = this.getDictionary()
if(subsubsubsubdictionary!= null){ 
subsubsubsubdictionary.setRecursiveReadOnly()
}

for(sub in this.getProvided()){
sub.setRecursiveReadOnly()
}

for(sub in this.getRequired()){
sub.setRecursiveReadOnly()
}

val subsubsubsubnamespace = this.getNamespace()
if(subsubsubsubnamespace!= null){ 
subsubsubsubnamespace.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _provided_java_cache : List<org.kevoree.Port>?
internal val _provided :MutableList<org.kevoree.Port>
internal var _required_java_cache : List<org.kevoree.Port>?
internal val _required :MutableList<org.kevoree.Port>
internal var _namespace : org.kevoree.Namespace?
override fun delete(){
_dictionary?.delete()
for(el in _provided){
el.delete()
}
for(el in _required){
el.delete()
}
_provided?.clear()
_provided_java_cache = null
_required?.clear()
_required_java_cache = null
_namespace = null
}

override fun getProvided() : List<org.kevoree.Port> {
return if(_provided_java_cache != null){
_provided_java_cache as List<org.kevoree.Port>
} else {
val tempL = java.util.ArrayList<org.kevoree.Port>()
tempL.addAll(_provided)
_provided_java_cache = tempL
tempL
}
}

override fun setProvided(provided : List<org.kevoree.Port> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(provided == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_provided_java_cache=null
if(_provided!= provided){
_provided.clear()
_provided.addAll(provided)
for(elem in provided){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeProvided(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("provided")
}
}

}

override fun addProvided(provided : org.kevoree.Port) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_provided_java_cache=null
(provided as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeProvided(provided)})
(provided as org.kevoree.container.KMFContainerImpl).setContainmentRefName("provided")
_provided.add(provided)
}

override fun addAllProvided(provided :List<org.kevoree.Port>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_provided_java_cache=null
_provided.addAll(provided)
for(el in provided){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeProvided(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("provided")
}
}


override fun removeProvided(provided : org.kevoree.Port) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_provided_java_cache=null
if(_provided.size() != 0 && _provided.indexOf(provided) != -1 ) {
_provided.remove(_provided.indexOf(provided))
(provided!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(provided!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllProvided() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getProvided())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_provided_java_cache=null
_provided.clear()
}

override fun getRequired() : List<org.kevoree.Port> {
return if(_required_java_cache != null){
_required_java_cache as List<org.kevoree.Port>
} else {
val tempL = java.util.ArrayList<org.kevoree.Port>()
tempL.addAll(_required)
_required_java_cache = tempL
tempL
}
}

override fun setRequired(required : List<org.kevoree.Port> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(required == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_required_java_cache=null
if(_required!= required){
_required.clear()
_required.addAll(required)
for(elem in required){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRequired(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("required")
}
}

}

override fun addRequired(required : org.kevoree.Port) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_required_java_cache=null
(required as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRequired(required)})
(required as org.kevoree.container.KMFContainerImpl).setContainmentRefName("required")
_required.add(required)
}

override fun addAllRequired(required :List<org.kevoree.Port>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_required_java_cache=null
_required.addAll(required)
for(el in required){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRequired(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("required")
}
}


override fun removeRequired(required : org.kevoree.Port) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_required_java_cache=null
if(_required.size() != 0 && _required.indexOf(required) != -1 ) {
_required.remove(_required.indexOf(required))
(required!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(required!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllRequired() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getRequired())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_required_java_cache=null
_required.clear()
}

override fun getNamespace() : org.kevoree.Namespace? {
return _namespace
}

override fun setNamespace(namespace : org.kevoree.Namespace? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_namespace!= namespace){
_namespace = (namespace)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createComponentInstance()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setMetaData(this.getMetaData())
		subResult.put(this,selfObjectClone)
val subsubsubsubdictionary = this.getDictionary()
if(subsubsubsubdictionary!= null){ 
(subsubsubsubdictionary as org.kevoree.impl.DictionaryInternal ).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getProvided()){
(sub as org.kevoree.impl.PortInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getRequired()){
(sub as org.kevoree.impl.PortInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.ComponentInstanceInternal
if(this.getTypeDefinition()!=null){
if(mutableOnly && this.getTypeDefinition()!!.isRecursiveReadOnly()){
clonedSelfObject.setTypeDefinition(this.getTypeDefinition()!!)
} else {
clonedSelfObject.setTypeDefinition(addrs.get(this.getTypeDefinition()) as org.kevoree.TypeDefinition)
}
}

if(this.getDictionary()!=null){
if(mutableOnly && this.getDictionary()!!.isRecursiveReadOnly()){
clonedSelfObject.setDictionary(this.getDictionary()!!)
} else {
clonedSelfObject.setDictionary(addrs.get(this.getDictionary()) as org.kevoree.Dictionary)
}
}

for(sub in this.getProvided()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addProvided(sub)
} else {
clonedSelfObject.addProvided(addrs.get(sub) as org.kevoree.Port)
}
		}

for(sub in this.getRequired()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addRequired(sub)
} else {
clonedSelfObject.addRequired(addrs.get(sub) as org.kevoree.Port)
}
		}

if(this.getNamespace()!=null){
if(mutableOnly && this.getNamespace()!!.isRecursiveReadOnly()){
clonedSelfObject.setNamespace(this.getNamespace()!!)
} else {
clonedSelfObject.setNamespace(addrs.get(this.getNamespace()) as org.kevoree.Namespace)
}
}

val subsubsubdictionary = this.getDictionary()
if(subsubsubdictionary!=null){ 
(subsubsubdictionary as org.kevoree.impl.DictionaryInternal).resolve(addrs,readOnly,mutableOnly)
}

for(sub in this.getProvided()){
			(sub as org.kevoree.impl.PortInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getRequired()){
			(sub as org.kevoree.impl.PortInternal ).resolve(addrs,readOnly,mutableOnly)
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
}
