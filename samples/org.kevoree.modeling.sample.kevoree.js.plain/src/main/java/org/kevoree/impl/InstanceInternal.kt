package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait InstanceInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Instance , org.kevoree.impl.NamedElementInternal {
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

setInternalReadOnly()
}
internal var _metaData : String
internal var _typeDefinition : org.kevoree.TypeDefinition?
internal var _dictionary : org.kevoree.Dictionary?
override fun delete(){
_dictionary?.delete()
_typeDefinition = null
_dictionary = null
}
override fun getMetaData() : String {
 return _metaData
}

 override fun setMetaData(metaData : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_metaData = metaData
}

override fun getTypeDefinition() : org.kevoree.TypeDefinition? {
return _typeDefinition
}

override fun setTypeDefinition(typeDefinition : org.kevoree.TypeDefinition? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_typeDefinition!= typeDefinition){
_typeDefinition = (typeDefinition)
}

}

override fun getDictionary() : org.kevoree.Dictionary? {
return _dictionary
}

override fun setDictionary(dictionary : org.kevoree.Dictionary? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_dictionary!= dictionary){
if(_dictionary!=null){
(_dictionary!! as org.kevoree.container.KMFContainerImpl).setEContainer(null, null)
(_dictionary!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
if(dictionary!=null){
(dictionary as org.kevoree.container.KMFContainerImpl).setEContainer(this, {() -> _dictionary= null})
(dictionary as org.kevoree.container.KMFContainerImpl).setContainmentRefName("dictionary")
}
_dictionary = (dictionary)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createInstance()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setMetaData(this.getMetaData())
		subResult.put(this,selfObjectClone)
val subsubsubsubdictionary = this.getDictionary()
if(subsubsubsubdictionary!= null){ 
(subsubsubsubdictionary as org.kevoree.impl.DictionaryInternal ).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.InstanceInternal
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

val subsubsubdictionary = this.getDictionary()
if(subsubsubdictionary!=null){ 
(subsubsubdictionary as org.kevoree.impl.DictionaryInternal).resolve(addrs,readOnly,mutableOnly)
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
