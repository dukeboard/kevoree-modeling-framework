package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NamespaceInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Namespace , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getChilds()){
sub.setRecursiveReadOnly()
}

val subsubsubsubparent = this.getParent()
if(subsubsubsubparent!= null){ 
subsubsubsubparent.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _childs_java_cache : List<org.kevoree.Namespace>?
internal val _childs : java.util.HashMap<Any,org.kevoree.Namespace>
internal var _parent : org.kevoree.Namespace?
override fun delete(){
for(el in _childs){
el.value.delete()
}
_childs?.clear()
_childs_java_cache = null
_parent = null
}

override fun getChilds() : List<org.kevoree.Namespace> {
return if(_childs_java_cache != null){
_childs_java_cache as List<org.kevoree.Namespace>
} else {
val tempL = java.util.ArrayList<org.kevoree.Namespace>()
tempL.addAll(_childs.values().toList())
_childs_java_cache = tempL
tempL
}
}

override fun setChilds(childs : List<org.kevoree.Namespace> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(childs == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_childs_java_cache=null
if(_childs!= childs){
_childs.clear()
for(el in childs){
_childs.put(el.getName(),el)
}
for(elem in childs){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeChilds(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("childs")
}
}

}

override fun addChilds(childs : org.kevoree.Namespace) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_childs_java_cache=null
(childs as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeChilds(childs)})
(childs as org.kevoree.container.KMFContainerImpl).setContainmentRefName("childs")
_childs.put(childs.getName(),childs)
}

override fun addAllChilds(childs :List<org.kevoree.Namespace>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_childs_java_cache=null
for(el in childs){
_childs.put(el.getName(),el)
}
for(el in childs){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeChilds(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("childs")
}
}


override fun removeChilds(childs : org.kevoree.Namespace) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_childs_java_cache=null
if(_childs.size() != 0 && _childs.containsKey(childs.getName())) {
_childs.remove(childs.getName())
(childs!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(childs!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllChilds() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getChilds()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_childs_java_cache=null
_childs.clear()
}

override fun getParent() : org.kevoree.Namespace? {
return _parent
}

override fun setParent(parent : org.kevoree.Namespace? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_parent!= parent){
_parent = (parent)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createNamespace()
		selfObjectClone.setName(this.getName())
		subResult.put(this,selfObjectClone)
for(sub in this.getChilds()){
(sub as org.kevoree.impl.NamespaceInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.NamespaceInternal
for(sub in this.getChilds()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addChilds(sub)
} else {
clonedSelfObject.addChilds(addrs.get(sub) as org.kevoree.Namespace)
}
		}

if(this.getParent()!=null){
if(mutableOnly && this.getParent()!!.isRecursiveReadOnly()){
clonedSelfObject.setParent(this.getParent()!!)
} else {
clonedSelfObject.setParent(addrs.get(this.getParent()) as org.kevoree.Namespace)
}
}

for(sub in this.getChilds()){
			(sub as org.kevoree.impl.NamespaceInternal ).resolve(addrs,readOnly,mutableOnly)
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
override fun findChildsByID(key : String) : org.kevoree.Namespace? {
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
"childs" -> {
val objFound = findChildsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"parent" -> {
getParent()
}
else -> {}
}
}
}
