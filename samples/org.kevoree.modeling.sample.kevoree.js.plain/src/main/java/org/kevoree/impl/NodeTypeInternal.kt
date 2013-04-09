package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NodeTypeInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.NodeType , org.kevoree.impl.LifeCycleTypeDefinitionInternal {
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

for(sub in this.getManagedPrimitiveTypes()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _managedPrimitiveTypes_java_cache : List<org.kevoree.AdaptationPrimitiveType>?
internal val _managedPrimitiveTypes : java.util.HashMap<Any,org.kevoree.AdaptationPrimitiveType>
override fun delete(){
_dictionaryType?.delete()
_managedPrimitiveTypes?.clear()
_managedPrimitiveTypes_java_cache = null
}

override fun getManagedPrimitiveTypes() : List<org.kevoree.AdaptationPrimitiveType> {
return if(_managedPrimitiveTypes_java_cache != null){
_managedPrimitiveTypes_java_cache as List<org.kevoree.AdaptationPrimitiveType>
} else {
val tempL = java.util.ArrayList<org.kevoree.AdaptationPrimitiveType>()
tempL.addAll(_managedPrimitiveTypes.values().toList())
_managedPrimitiveTypes_java_cache = tempL
tempL
}
}

override fun setManagedPrimitiveTypes(managedPrimitiveTypes : List<org.kevoree.AdaptationPrimitiveType> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(managedPrimitiveTypes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_managedPrimitiveTypes_java_cache=null
if(_managedPrimitiveTypes!= managedPrimitiveTypes){
_managedPrimitiveTypes.clear()
for(el in managedPrimitiveTypes){
_managedPrimitiveTypes.put(el.getName(),el)
}
}

}

override fun addManagedPrimitiveTypes(managedPrimitiveTypes : org.kevoree.AdaptationPrimitiveType) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_managedPrimitiveTypes_java_cache=null
_managedPrimitiveTypes.put(managedPrimitiveTypes.getName(),managedPrimitiveTypes)
}

override fun addAllManagedPrimitiveTypes(managedPrimitiveTypes :List<org.kevoree.AdaptationPrimitiveType>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_managedPrimitiveTypes_java_cache=null
for(el in managedPrimitiveTypes){
_managedPrimitiveTypes.put(el.getName(),el)
}
}


override fun removeManagedPrimitiveTypes(managedPrimitiveTypes : org.kevoree.AdaptationPrimitiveType) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_managedPrimitiveTypes_java_cache=null
if(_managedPrimitiveTypes.size() != 0 && _managedPrimitiveTypes.containsKey(managedPrimitiveTypes.getName())) {
_managedPrimitiveTypes.remove(managedPrimitiveTypes.getName())
}
}

override fun removeAllManagedPrimitiveTypes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_managedPrimitiveTypes_java_cache=null
_managedPrimitiveTypes.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createNodeType()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setFactoryBean(this.getFactoryBean())
		selfObjectClone.setBean(this.getBean())
		selfObjectClone.setStartMethod(this.getStartMethod())
		selfObjectClone.setStopMethod(this.getStopMethod())
		selfObjectClone.setUpdateMethod(this.getUpdateMethod())
		subResult.put(this,selfObjectClone)
val subsubsubsubdictionaryType = this.getDictionaryType()
if(subsubsubsubdictionaryType!= null){ 
(subsubsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal ).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.NodeTypeInternal
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

for(sub in this.getManagedPrimitiveTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addManagedPrimitiveTypes(sub)
} else {
clonedSelfObject.addManagedPrimitiveTypes(addrs.get(sub) as org.kevoree.AdaptationPrimitiveType)
}
		}

val subsubsubdictionaryType = this.getDictionaryType()
if(subsubsubdictionaryType!=null){ 
(subsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal).resolve(addrs,readOnly,mutableOnly)
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
override fun findManagedPrimitiveTypesByID(key : String) : org.kevoree.AdaptationPrimitiveType? {
return _managedPrimitiveTypes.get(key)
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
"managedPrimitiveTypes" -> {
val objFound = findManagedPrimitiveTypesByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
else -> {}
}
}
}
