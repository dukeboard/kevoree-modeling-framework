package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ChannelInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Channel , org.kevoree.impl.NamedElementInternal , org.kevoree.impl.InstanceInternal {
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
override fun delete(){
_dictionary?.delete()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createChannel()
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
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.ChannelInternal
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
