package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait TypeDefinitionInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.TypeDefinition , org.kevoree.impl.NamedElementInternal {
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

setInternalReadOnly()
}
internal var _factoryBean : String
internal var _bean : String
internal var _deployUnits_java_cache : List<org.kevoree.DeployUnit>?
internal val _deployUnits : java.util.HashMap<Any,org.kevoree.DeployUnit>
internal var _dictionaryType : org.kevoree.DictionaryType?
internal var _superTypes_java_cache : List<org.kevoree.TypeDefinition>?
internal val _superTypes : java.util.HashMap<Any,org.kevoree.TypeDefinition>
override fun delete(){
_dictionaryType?.delete()
_deployUnits?.clear()
_deployUnits_java_cache = null
_dictionaryType = null
_superTypes?.clear()
_superTypes_java_cache = null
}
override fun getFactoryBean() : String {
 return _factoryBean
}

 override fun setFactoryBean(factoryBean : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_factoryBean = factoryBean
}
override fun getBean() : String {
 return _bean
}

 override fun setBean(bean : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_bean = bean
}

override fun getDeployUnits() : List<org.kevoree.DeployUnit> {
return if(_deployUnits_java_cache != null){
_deployUnits_java_cache as List<org.kevoree.DeployUnit>
} else {
val tempL = java.util.ArrayList<org.kevoree.DeployUnit>()
tempL.addAll(_deployUnits.values().toList())
_deployUnits_java_cache = tempL
tempL
}
}

override fun setDeployUnits(deployUnits : List<org.kevoree.DeployUnit> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(deployUnits == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_deployUnits_java_cache=null
if(_deployUnits!= deployUnits){
_deployUnits.clear()
for(el in deployUnits){
_deployUnits.put(el.getName(),el)
}
}

}

override fun addDeployUnits(deployUnits : org.kevoree.DeployUnit) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_deployUnits_java_cache=null
_deployUnits.put(deployUnits.getName(),deployUnits)
}

override fun addAllDeployUnits(deployUnits :List<org.kevoree.DeployUnit>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_deployUnits_java_cache=null
for(el in deployUnits){
_deployUnits.put(el.getName(),el)
}
}


override fun removeDeployUnits(deployUnits : org.kevoree.DeployUnit) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_deployUnits_java_cache=null
if(_deployUnits.size() != 0 && _deployUnits.containsKey(deployUnits.getName())) {
_deployUnits.remove(deployUnits.getName())
}
}

override fun removeAllDeployUnits() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_deployUnits_java_cache=null
_deployUnits.clear()
}

override fun getDictionaryType() : org.kevoree.DictionaryType? {
return _dictionaryType
}

override fun setDictionaryType(dictionaryType : org.kevoree.DictionaryType? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_dictionaryType!= dictionaryType){
if(_dictionaryType!=null){
(_dictionaryType!! as org.kevoree.container.KMFContainerImpl).setEContainer(null, null)
(_dictionaryType!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
if(dictionaryType!=null){
(dictionaryType as org.kevoree.container.KMFContainerImpl).setEContainer(this, {() -> _dictionaryType= null})
(dictionaryType as org.kevoree.container.KMFContainerImpl).setContainmentRefName("dictionaryType")
}
_dictionaryType = (dictionaryType)
}

}

override fun getSuperTypes() : List<org.kevoree.TypeDefinition> {
return if(_superTypes_java_cache != null){
_superTypes_java_cache as List<org.kevoree.TypeDefinition>
} else {
val tempL = java.util.ArrayList<org.kevoree.TypeDefinition>()
tempL.addAll(_superTypes.values().toList())
_superTypes_java_cache = tempL
tempL
}
}

override fun setSuperTypes(superTypes : List<org.kevoree.TypeDefinition> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(superTypes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_superTypes_java_cache=null
if(_superTypes!= superTypes){
_superTypes.clear()
for(el in superTypes){
_superTypes.put(el.getName(),el)
}
}

}

override fun addSuperTypes(superTypes : org.kevoree.TypeDefinition) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_superTypes_java_cache=null
_superTypes.put(superTypes.getName(),superTypes)
}

override fun addAllSuperTypes(superTypes :List<org.kevoree.TypeDefinition>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_superTypes_java_cache=null
for(el in superTypes){
_superTypes.put(el.getName(),el)
}
}


override fun removeSuperTypes(superTypes : org.kevoree.TypeDefinition) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_superTypes_java_cache=null
if(_superTypes.size() != 0 && _superTypes.containsKey(superTypes.getName())) {
_superTypes.remove(superTypes.getName())
}
}

override fun removeAllSuperTypes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_superTypes_java_cache=null
_superTypes.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createTypeDefinition()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setFactoryBean(this.getFactoryBean())
		selfObjectClone.setBean(this.getBean())
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
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.TypeDefinitionInternal
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
override fun findDeployUnitsByID(key : String) : org.kevoree.DeployUnit? {
return _deployUnits.get(key)
}
override fun findSuperTypesByID(key : String) : org.kevoree.TypeDefinition? {
return _superTypes.get(key)
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
else -> {}
}
}
}
