package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ComponentTypeInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.ComponentType , org.kevoree.impl.LifeCycleTypeDefinitionInternal {
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

for(sub in this.getRequired()){
sub.setRecursiveReadOnly()
}

for(sub in this.getIntegrationPatterns()){
sub.setRecursiveReadOnly()
}

val subsubsubsubextraFonctionalProperties = this.getExtraFonctionalProperties()
if(subsubsubsubextraFonctionalProperties!= null){ 
subsubsubsubextraFonctionalProperties.setRecursiveReadOnly()
}

for(sub in this.getProvided()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _required_java_cache : List<org.kevoree.PortTypeRef>?
internal val _required : java.util.HashMap<Any,org.kevoree.PortTypeRef>
internal var _integrationPatterns_java_cache : List<org.kevoree.IntegrationPattern>?
internal val _integrationPatterns : java.util.HashMap<Any,org.kevoree.IntegrationPattern>
internal var _extraFonctionalProperties : org.kevoree.ExtraFonctionalProperty?
internal var _provided_java_cache : List<org.kevoree.PortTypeRef>?
internal val _provided : java.util.HashMap<Any,org.kevoree.PortTypeRef>
override fun delete(){
_dictionaryType?.delete()
for(el in _required){
el.value.delete()
}
for(el in _integrationPatterns){
el.value.delete()
}
_extraFonctionalProperties?.delete()
for(el in _provided){
el.value.delete()
}
_required?.clear()
_required_java_cache = null
_integrationPatterns?.clear()
_integrationPatterns_java_cache = null
_extraFonctionalProperties = null
_provided?.clear()
_provided_java_cache = null
}

override fun getRequired() : List<org.kevoree.PortTypeRef> {
return if(_required_java_cache != null){
_required_java_cache as List<org.kevoree.PortTypeRef>
} else {
val tempL = java.util.ArrayList<org.kevoree.PortTypeRef>()
tempL.addAll(_required.values().toList())
_required_java_cache = tempL
tempL
}
}

override fun setRequired(required : List<org.kevoree.PortTypeRef> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(required == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_required_java_cache=null
if(_required!= required){
_required.clear()
for(el in required){
_required.put(el.getName(),el)
}
for(elem in required){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRequired(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("required")
}
}

}

override fun addRequired(required : org.kevoree.PortTypeRef) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_required_java_cache=null
(required as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRequired(required)})
(required as org.kevoree.container.KMFContainerImpl).setContainmentRefName("required")
_required.put(required.getName(),required)
}

override fun addAllRequired(required :List<org.kevoree.PortTypeRef>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_required_java_cache=null
for(el in required){
_required.put(el.getName(),el)
}
for(el in required){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRequired(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("required")
}
}


override fun removeRequired(required : org.kevoree.PortTypeRef) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_required_java_cache=null
if(_required.size() != 0 && _required.containsKey(required.getName())) {
_required.remove(required.getName())
(required!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(required!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllRequired() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getRequired()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_required_java_cache=null
_required.clear()
}

override fun getIntegrationPatterns() : List<org.kevoree.IntegrationPattern> {
return if(_integrationPatterns_java_cache != null){
_integrationPatterns_java_cache as List<org.kevoree.IntegrationPattern>
} else {
val tempL = java.util.ArrayList<org.kevoree.IntegrationPattern>()
tempL.addAll(_integrationPatterns.values().toList())
_integrationPatterns_java_cache = tempL
tempL
}
}

override fun setIntegrationPatterns(integrationPatterns : List<org.kevoree.IntegrationPattern> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(integrationPatterns == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_integrationPatterns_java_cache=null
if(_integrationPatterns!= integrationPatterns){
_integrationPatterns.clear()
for(el in integrationPatterns){
_integrationPatterns.put(el.getName(),el)
}
for(elem in integrationPatterns){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeIntegrationPatterns(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("integrationPatterns")
}
}

}

override fun addIntegrationPatterns(integrationPatterns : org.kevoree.IntegrationPattern) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_integrationPatterns_java_cache=null
(integrationPatterns as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeIntegrationPatterns(integrationPatterns)})
(integrationPatterns as org.kevoree.container.KMFContainerImpl).setContainmentRefName("integrationPatterns")
_integrationPatterns.put(integrationPatterns.getName(),integrationPatterns)
}

override fun addAllIntegrationPatterns(integrationPatterns :List<org.kevoree.IntegrationPattern>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_integrationPatterns_java_cache=null
for(el in integrationPatterns){
_integrationPatterns.put(el.getName(),el)
}
for(el in integrationPatterns){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeIntegrationPatterns(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("integrationPatterns")
}
}


override fun removeIntegrationPatterns(integrationPatterns : org.kevoree.IntegrationPattern) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_integrationPatterns_java_cache=null
if(_integrationPatterns.size() != 0 && _integrationPatterns.containsKey(integrationPatterns.getName())) {
_integrationPatterns.remove(integrationPatterns.getName())
(integrationPatterns!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(integrationPatterns!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllIntegrationPatterns() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getIntegrationPatterns()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_integrationPatterns_java_cache=null
_integrationPatterns.clear()
}

override fun getExtraFonctionalProperties() : org.kevoree.ExtraFonctionalProperty? {
return _extraFonctionalProperties
}

override fun setExtraFonctionalProperties(extraFonctionalProperties : org.kevoree.ExtraFonctionalProperty? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_extraFonctionalProperties!= extraFonctionalProperties){
if(_extraFonctionalProperties!=null){
(_extraFonctionalProperties!! as org.kevoree.container.KMFContainerImpl).setEContainer(null, null)
(_extraFonctionalProperties!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
if(extraFonctionalProperties!=null){
(extraFonctionalProperties as org.kevoree.container.KMFContainerImpl).setEContainer(this, {() -> _extraFonctionalProperties= null})
(extraFonctionalProperties as org.kevoree.container.KMFContainerImpl).setContainmentRefName("extraFonctionalProperties")
}
_extraFonctionalProperties = (extraFonctionalProperties)
}

}

override fun getProvided() : List<org.kevoree.PortTypeRef> {
return if(_provided_java_cache != null){
_provided_java_cache as List<org.kevoree.PortTypeRef>
} else {
val tempL = java.util.ArrayList<org.kevoree.PortTypeRef>()
tempL.addAll(_provided.values().toList())
_provided_java_cache = tempL
tempL
}
}

override fun setProvided(provided : List<org.kevoree.PortTypeRef> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(provided == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_provided_java_cache=null
if(_provided!= provided){
_provided.clear()
for(el in provided){
_provided.put(el.getName(),el)
}
for(elem in provided){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeProvided(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("provided")
}
}

}

override fun addProvided(provided : org.kevoree.PortTypeRef) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_provided_java_cache=null
(provided as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeProvided(provided)})
(provided as org.kevoree.container.KMFContainerImpl).setContainmentRefName("provided")
_provided.put(provided.getName(),provided)
}

override fun addAllProvided(provided :List<org.kevoree.PortTypeRef>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_provided_java_cache=null
for(el in provided){
_provided.put(el.getName(),el)
}
for(el in provided){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeProvided(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("provided")
}
}


override fun removeProvided(provided : org.kevoree.PortTypeRef) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_provided_java_cache=null
if(_provided.size() != 0 && _provided.containsKey(provided.getName())) {
_provided.remove(provided.getName())
(provided!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(provided!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllProvided() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getProvided()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_provided_java_cache=null
_provided.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createComponentType()
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

for(sub in this.getRequired()){
(sub as org.kevoree.impl.PortTypeRefInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getIntegrationPatterns()){
(sub as org.kevoree.impl.IntegrationPatternInternal).getClonelazy(subResult, _factories,mutableOnly)
}

val subsubsubsubextraFonctionalProperties = this.getExtraFonctionalProperties()
if(subsubsubsubextraFonctionalProperties!= null){ 
(subsubsubsubextraFonctionalProperties as org.kevoree.impl.ExtraFonctionalPropertyInternal ).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getProvided()){
(sub as org.kevoree.impl.PortTypeRefInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.ComponentTypeInternal
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

for(sub in this.getRequired()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addRequired(sub)
} else {
clonedSelfObject.addRequired(addrs.get(sub) as org.kevoree.PortTypeRef)
}
		}

for(sub in this.getIntegrationPatterns()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addIntegrationPatterns(sub)
} else {
clonedSelfObject.addIntegrationPatterns(addrs.get(sub) as org.kevoree.IntegrationPattern)
}
		}

if(this.getExtraFonctionalProperties()!=null){
if(mutableOnly && this.getExtraFonctionalProperties()!!.isRecursiveReadOnly()){
clonedSelfObject.setExtraFonctionalProperties(this.getExtraFonctionalProperties()!!)
} else {
clonedSelfObject.setExtraFonctionalProperties(addrs.get(this.getExtraFonctionalProperties()) as org.kevoree.ExtraFonctionalProperty)
}
}

for(sub in this.getProvided()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addProvided(sub)
} else {
clonedSelfObject.addProvided(addrs.get(sub) as org.kevoree.PortTypeRef)
}
		}

val subsubsubdictionaryType = this.getDictionaryType()
if(subsubsubdictionaryType!=null){ 
(subsubsubdictionaryType as org.kevoree.impl.DictionaryTypeInternal).resolve(addrs,readOnly,mutableOnly)
}

for(sub in this.getRequired()){
			(sub as org.kevoree.impl.PortTypeRefInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getIntegrationPatterns()){
			(sub as org.kevoree.impl.IntegrationPatternInternal ).resolve(addrs,readOnly,mutableOnly)
		}

val subsubsubextraFonctionalProperties = this.getExtraFonctionalProperties()
if(subsubsubextraFonctionalProperties!=null){ 
(subsubsubextraFonctionalProperties as org.kevoree.impl.ExtraFonctionalPropertyInternal).resolve(addrs,readOnly,mutableOnly)
}

for(sub in this.getProvided()){
			(sub as org.kevoree.impl.PortTypeRefInternal ).resolve(addrs,readOnly,mutableOnly)
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
override fun findRequiredByID(key : String) : org.kevoree.PortTypeRef? {
return _required.get(key)
}
override fun findIntegrationPatternsByID(key : String) : org.kevoree.IntegrationPattern? {
return _integrationPatterns.get(key)
}
override fun findProvidedByID(key : String) : org.kevoree.PortTypeRef? {
return _provided.get(key)
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
"required" -> {
val objFound = findRequiredByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
"integrationPatterns" -> {
val objFound = findIntegrationPatternsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"provided" -> {
val objFound = findProvidedByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
else -> {}
}
}
}
