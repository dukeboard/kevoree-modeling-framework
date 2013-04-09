package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NodeNetworkInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.NodeNetwork {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getLink()){
sub.setRecursiveReadOnly()
}

val subsubsubsubinitBy = this.getInitBy()
if(subsubsubsubinitBy!= null){ 
subsubsubsubinitBy.setRecursiveReadOnly()
}

val subsubsubsubtarget = this.getTarget()
if(subsubsubsubtarget!= null){ 
subsubsubsubtarget.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _link_java_cache : List<org.kevoree.NodeLink>?
internal val _link :MutableList<org.kevoree.NodeLink>
internal var _initBy : org.kevoree.ContainerNode?
internal var _target : org.kevoree.ContainerNode?
override fun delete(){
for(el in _link){
el.delete()
}
_link?.clear()
_link_java_cache = null
_initBy = null
_target = null
}

override fun getLink() : List<org.kevoree.NodeLink> {
return if(_link_java_cache != null){
_link_java_cache as List<org.kevoree.NodeLink>
} else {
val tempL = java.util.ArrayList<org.kevoree.NodeLink>()
tempL.addAll(_link)
_link_java_cache = tempL
tempL
}
}

override fun setLink(link : List<org.kevoree.NodeLink> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(link == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_link_java_cache=null
if(_link!= link){
_link.clear()
_link.addAll(link)
for(elem in link){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeLink(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("link")
}
}

}

override fun addLink(link : org.kevoree.NodeLink) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_link_java_cache=null
(link as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeLink(link)})
(link as org.kevoree.container.KMFContainerImpl).setContainmentRefName("link")
_link.add(link)
}

override fun addAllLink(link :List<org.kevoree.NodeLink>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_link_java_cache=null
_link.addAll(link)
for(el in link){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeLink(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("link")
}
}


override fun removeLink(link : org.kevoree.NodeLink) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_link_java_cache=null
if(_link.size() != 0 && _link.indexOf(link) != -1 ) {
_link.remove(_link.indexOf(link))
(link!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(link!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllLink() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getLink())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_link_java_cache=null
_link.clear()
}

override fun getInitBy() : org.kevoree.ContainerNode? {
return _initBy
}

override fun setInitBy(initBy : org.kevoree.ContainerNode? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_initBy!= initBy){
_initBy = (initBy)
}

}

override fun getTarget() : org.kevoree.ContainerNode? {
return _target
}

override fun setTarget(target : org.kevoree.ContainerNode? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_target!= target){
_target = (target)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createNodeNetwork()
		subResult.put(this,selfObjectClone)
for(sub in this.getLink()){
(sub as org.kevoree.impl.NodeLinkInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.NodeNetworkInternal
for(sub in this.getLink()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addLink(sub)
} else {
clonedSelfObject.addLink(addrs.get(sub) as org.kevoree.NodeLink)
}
		}

if(this.getInitBy()!=null){
if(mutableOnly && this.getInitBy()!!.isRecursiveReadOnly()){
clonedSelfObject.setInitBy(this.getInitBy()!!)
} else {
clonedSelfObject.setInitBy(addrs.get(this.getInitBy()) as org.kevoree.ContainerNode)
}
}

if(this.getTarget()!=null){
if(mutableOnly && this.getTarget()!!.isRecursiveReadOnly()){
clonedSelfObject.setTarget(this.getTarget()!!)
} else {
clonedSelfObject.setTarget(addrs.get(this.getTarget()) as org.kevoree.ContainerNode)
}
}

for(sub in this.getLink()){
			(sub as org.kevoree.impl.NodeLinkInternal ).resolve(addrs,readOnly,mutableOnly)
		}

		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun path() : String? {
return null
}
override fun findByPath(query : String) : Any? {return null}
}
