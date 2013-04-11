package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ServicePortTypeInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.ServicePortType , org.kevoree.impl.PortTypeInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getDeployUnits()){
sub.setRecursiveReadOnly()
}

val subsubsubsubdictionaryType = this.getDictionaryType()
if(subsubsubsubdictionaryType!= null){ 
subsubsubsubdictionaryType.setRecursiveReadOnly()
}

for(sub in this.getSuperTypes()){
sub.setRecursiveReadOnly()
}

for(sub in this.getOperations()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _interface : String
internal var _operations_java_cache : List<org.kevoree.Operation>?
internal val _operations : java.util.HashMap<Any,org.kevoree.Operation>
override fun delete(){
_dictionaryType?.delete()
for(el in _operations){
el.value.delete()
}
_operations?.clear()
_operations_java_cache = null
}
override fun getInterface() : String {
 return _interface
}

 override fun setInterface(interface : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_interface = interface
}

override fun getOperations() : List<org.kevoree.Operation> {
return if(_operations_java_cache != null){
_operations_java_cache as List<org.kevoree.Operation>
} else {
val tempL = java.util.ArrayList<org.kevoree.Operation>()
tempL.addAll(_operations.values().toList())
_operations_java_cache = tempL
tempL
}
}

override fun setOperations(operations : List<org.kevoree.Operation> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(operations == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_operations_java_cache=null
if(_operations!= operations){
_operations.clear()
for(el in operations){
_operations.put(el.getName(),el)
}
for(elem in operations){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeOperations(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("operations")
}
}

}

override fun addOperations(operations : org.kevoree.Operation) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_operations_java_cache=null
(operations as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeOperations(operations)})
(operations as org.kevoree.container.KMFContainerImpl).setContainmentRefName("operations")
_operations.put(operations.getName(),operations)
}

override fun addAllOperations(operations :List<org.kevoree.Operation>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_operations_java_cache=null
for(el in operations){
_operations.put(el.getName(),el)
}
for(el in operations){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeOperations(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("operations")
}
}


override fun removeOperations(operations : org.kevoree.Operation) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_operations_java_cache=null
if(_operations.size() != 0 && _operations.containsKey(operations.getName())) {
_operations.remove(operations.getName())
(operations!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(operations!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllOperations() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getOperations()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_operations_java_cache=null
_operations.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createServicePortType()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setFactoryBean(this.getFactoryBean())
		selfObjectClone.setBean(this.getBean())
		selfObjectClone.setSynchrone(this.getSynchrone())
		selfObjectClone.setInterface(this.getInterface())
		subResult.put(this,selfObjectClone)
val subsubsubsubdictionaryType = this.getDictionaryType()
if(subsubsubsubdictionaryType!= null){ 
(subsubsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal ).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getOperations()){
(sub as org.kevoree.impl.OperationInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.ServicePortTypeInternal
for(sub in this.getDeployUnits()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addDeployUnits(sub)
} else {
clonedSelfObject.addDeployUnits(addrs.get(sub) as org.kevoree.DeployUnit)
}
		}

if(this.getDictionaryType()!=null){
if(mutableOnly && this.getDictionaryType()!!.isRecursiveReadOnly()){
clonedSelfObject.setDictionaryType(this.getDictionaryType()!!)
} else {
clonedSelfObject.setDictionaryType(addrs.get(this.getDictionaryType()) as org.kevoree.DictionaryType)
}
}

for(sub in this.getSuperTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addSuperTypes(sub)
} else {
clonedSelfObject.addSuperTypes(addrs.get(sub) as org.kevoree.TypeDefinition)
}
		}

for(sub in this.getOperations()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addOperations(sub)
} else {
clonedSelfObject.addOperations(addrs.get(sub) as org.kevoree.Operation)
}
		}

val subsubsubdictionaryType = this.getDictionaryType()
if(subsubsubdictionaryType!=null){ 
(subsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal).resolve(addrs,readOnly,mutableOnly)
}

for(sub in this.getOperations()){
			(sub as org.kevoree.impl.OperationInternal ).resolve(addrs,readOnly,mutableOnly)
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
override fun findOperationsByID(key : String) : org.kevoree.Operation? {
return _operations.get(key)
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
"deployUnits" -> {
val objFound = findDeployUnitsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"superTypes" -> {
val objFound = findSuperTypesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"operations" -> {
val objFound = findOperationsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
else -> {}
}
}
}
