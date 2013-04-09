package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait PortTypeRefInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.PortTypeRef , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
val subsubsubsubref = this.getRef()
if(subsubsubsubref!= null){ 
subsubsubsubref.setRecursiveReadOnly()
}

for(sub in this.getMappings()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _optional : Boolean
internal var _noDependency : Boolean
internal var _ref : org.kevoree.PortType?
internal var _mappings_java_cache : List<org.kevoree.PortTypeMapping>?
internal val _mappings :MutableList<org.kevoree.PortTypeMapping>
override fun delete(){
for(el in _mappings){
el.delete()
}
_ref = null
_mappings?.clear()
_mappings_java_cache = null
}
override fun getOptional() : Boolean {
 return _optional
}

 override fun setOptional(optional : Boolean) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_optional = optional
}
override fun getNoDependency() : Boolean {
 return _noDependency
}

 override fun setNoDependency(noDependency : Boolean) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_noDependency = noDependency
}

override fun getRef() : org.kevoree.PortType? {
return _ref
}

override fun setRef(ref : org.kevoree.PortType? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_ref!= ref){
_ref = (ref)
}

}

override fun getMappings() : List<org.kevoree.PortTypeMapping> {
return if(_mappings_java_cache != null){
_mappings_java_cache as List<org.kevoree.PortTypeMapping>
} else {
val tempL = java.util.ArrayList<org.kevoree.PortTypeMapping>()
tempL.addAll(_mappings)
_mappings_java_cache = tempL
tempL
}
}

override fun setMappings(mappings : List<org.kevoree.PortTypeMapping> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(mappings == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_mappings_java_cache=null
if(_mappings!= mappings){
_mappings.clear()
_mappings.addAll(mappings)
for(elem in mappings){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeMappings(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("mappings")
}
}

}

override fun addMappings(mappings : org.kevoree.PortTypeMapping) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_mappings_java_cache=null
(mappings as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeMappings(mappings)})
(mappings as org.kevoree.container.KMFContainerImpl).setContainmentRefName("mappings")
_mappings.add(mappings)
}

override fun addAllMappings(mappings :List<org.kevoree.PortTypeMapping>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_mappings_java_cache=null
_mappings.addAll(mappings)
for(el in mappings){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeMappings(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("mappings")
}
}


override fun removeMappings(mappings : org.kevoree.PortTypeMapping) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_mappings_java_cache=null
if(_mappings.size() != 0 && _mappings.indexOf(mappings) != -1 ) {
_mappings.remove(_mappings.indexOf(mappings))
(mappings!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(mappings!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllMappings() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getMappings())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_mappings_java_cache=null
_mappings.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createPortTypeRef()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setOptional(this.getOptional())
		selfObjectClone.setNoDependency(this.getNoDependency())
		subResult.put(this,selfObjectClone)
for(sub in this.getMappings()){
(sub as org.kevoree.impl.PortTypeMappingInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.PortTypeRefInternal
if(this.getRef()!=null){
if(mutableOnly && this.getRef()!!.isRecursiveReadOnly()){
clonedSelfObject.setRef(this.getRef()!!)
} else {
clonedSelfObject.setRef(addrs.get(this.getRef()) as org.kevoree.PortType)
}
}

for(sub in this.getMappings()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addMappings(sub)
} else {
clonedSelfObject.addMappings(addrs.get(sub) as org.kevoree.PortTypeMapping)
}
		}

for(sub in this.getMappings()){
			(sub as org.kevoree.impl.PortTypeMappingInternal ).resolve(addrs,readOnly,mutableOnly)
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
