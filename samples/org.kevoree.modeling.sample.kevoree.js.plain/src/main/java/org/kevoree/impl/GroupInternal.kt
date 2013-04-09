package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait GroupInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Group , org.kevoree.impl.InstanceInternal {
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

for(sub in this.getSubNodes()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _subNodes_java_cache : List<org.kevoree.ContainerNode>?
internal val _subNodes : java.util.HashMap<Any,org.kevoree.ContainerNode>
override fun delete(){
_dictionary?.delete()
_subNodes?.clear()
_subNodes_java_cache = null
}

override fun getSubNodes() : List<org.kevoree.ContainerNode> {
return if(_subNodes_java_cache != null){
_subNodes_java_cache as List<org.kevoree.ContainerNode>
} else {
val tempL = java.util.ArrayList<org.kevoree.ContainerNode>()
tempL.addAll(_subNodes.values().toList())
_subNodes_java_cache = tempL
tempL
}
}

override fun setSubNodes(subNodes : List<org.kevoree.ContainerNode> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(subNodes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_subNodes_java_cache=null
if(_subNodes!= subNodes){
_subNodes.clear()
for(el in subNodes){
_subNodes.put(el.getName(),el)
}
}

}

override fun addSubNodes(subNodes : org.kevoree.ContainerNode) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_subNodes_java_cache=null
_subNodes.put(subNodes.getName(),subNodes)
}

override fun addAllSubNodes(subNodes :List<org.kevoree.ContainerNode>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_subNodes_java_cache=null
for(el in subNodes){
_subNodes.put(el.getName(),el)
}
}


override fun removeSubNodes(subNodes : org.kevoree.ContainerNode) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_subNodes_java_cache=null
if(_subNodes.size() != 0 && _subNodes.containsKey(subNodes.getName())) {
_subNodes.remove(subNodes.getName())
}
}

override fun removeAllSubNodes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_subNodes_java_cache=null
_subNodes.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createGroup()
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
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.GroupInternal
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

for(sub in this.getSubNodes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addSubNodes(sub)
} else {
clonedSelfObject.addSubNodes(addrs.get(sub) as org.kevoree.ContainerNode)
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
override fun findSubNodesByID(key : String) : org.kevoree.ContainerNode? {
return _subNodes.get(key)
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
"typeDefinition" -> {
getTypeDefinition()
}
"subNodes" -> {
val objFound = findSubNodesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
else -> {}
}
}
}
