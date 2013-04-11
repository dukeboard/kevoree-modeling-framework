package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait OperationInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Operation , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getParameters()){
sub.setRecursiveReadOnly()
}

val subsubsubsubreturnType = this.getReturnType()
if(subsubsubsubreturnType!= null){ 
subsubsubsubreturnType.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _parameters_java_cache : List<org.kevoree.Parameter>?
internal val _parameters : java.util.HashMap<Any,org.kevoree.Parameter>
internal var _returnType : org.kevoree.TypedElement?
override fun delete(){
for(el in _parameters){
el.value.delete()
}
_parameters?.clear()
_parameters_java_cache = null
_returnType = null
}

override fun getParameters() : List<org.kevoree.Parameter> {
return if(_parameters_java_cache != null){
_parameters_java_cache as List<org.kevoree.Parameter>
} else {
val tempL = java.util.ArrayList<org.kevoree.Parameter>()
tempL.addAll(_parameters.values().toList())
_parameters_java_cache = tempL
tempL
}
}

override fun setParameters(parameters : List<org.kevoree.Parameter> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(parameters == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_parameters_java_cache=null
if(_parameters!= parameters){
_parameters.clear()
for(el in parameters){
_parameters.put(el.getName(),el)
}
for(elem in parameters){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeParameters(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("parameters")
}
}

}

override fun addParameters(parameters : org.kevoree.Parameter) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_parameters_java_cache=null
(parameters as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeParameters(parameters)})
(parameters as org.kevoree.container.KMFContainerImpl).setContainmentRefName("parameters")
_parameters.put(parameters.getName(),parameters)
}

override fun addAllParameters(parameters :List<org.kevoree.Parameter>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_parameters_java_cache=null
for(el in parameters){
_parameters.put(el.getName(),el)
}
for(el in parameters){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeParameters(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("parameters")
}
}


override fun removeParameters(parameters : org.kevoree.Parameter) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_parameters_java_cache=null
if(_parameters.size() != 0 && _parameters.containsKey(parameters.getName())) {
_parameters.remove(parameters.getName())
(parameters!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(parameters!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllParameters() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getParameters()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_parameters_java_cache=null
_parameters.clear()
}

override fun getReturnType() : org.kevoree.TypedElement? {
return _returnType
}

override fun setReturnType(returnType : org.kevoree.TypedElement? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_returnType!= returnType){
_returnType = (returnType)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createOperation()
		selfObjectClone.setName(this.getName())
		subResult.put(this,selfObjectClone)
for(sub in this.getParameters()){
(sub as org.kevoree.impl.ParameterInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.OperationInternal
for(sub in this.getParameters()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addParameters(sub)
} else {
clonedSelfObject.addParameters(addrs.get(sub) as org.kevoree.Parameter)
}
		}

if(this.getReturnType()!=null){
if(mutableOnly && this.getReturnType()!!.isRecursiveReadOnly()){
clonedSelfObject.setReturnType(this.getReturnType()!!)
} else {
clonedSelfObject.setReturnType(addrs.get(this.getReturnType()) as org.kevoree.TypedElement)
}
}

for(sub in this.getParameters()){
			(sub as org.kevoree.impl.ParameterInternal ).resolve(addrs,readOnly,mutableOnly)
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
override fun findParametersByID(key : String) : org.kevoree.Parameter? {
return _parameters.get(key)
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
"parameters" -> {
val objFound = findParametersByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
"returnType" -> {
getReturnType()
}
else -> {}
}
}
}
