package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DeployUnitInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.DeployUnit , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getRequiredLibs()){
sub.setRecursiveReadOnly()
}

val subsubsubsubtargetNodeType = this.getTargetNodeType()
if(subsubsubsubtargetNodeType!= null){ 
subsubsubsubtargetNodeType.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _groupName : String
internal var _unitName : String
internal var _version : String
internal var _url : String
internal var _hashcode : String
internal var _type : String
internal var _requiredLibs_java_cache : List<org.kevoree.DeployUnit>?
internal val _requiredLibs : java.util.HashMap<Any,org.kevoree.DeployUnit>
internal var _targetNodeType : org.kevoree.NodeType?
override fun delete(){
_requiredLibs?.clear()
_requiredLibs_java_cache = null
_targetNodeType = null
}
override fun getGroupName() : String {
 return _groupName
}

 override fun setGroupName(groupName : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_groupName = groupName
}
override fun getUnitName() : String {
 return _unitName
}

 override fun setUnitName(unitName : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_unitName = unitName
}
override fun getVersion() : String {
 return _version
}

 override fun setVersion(version : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_version = version
}
override fun getUrl() : String {
 return _url
}

 override fun setUrl(url : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_url = url
}
override fun getHashcode() : String {
 return _hashcode
}

 override fun setHashcode(hashcode : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_hashcode = hashcode
}
override fun getType() : String {
 return _type
}

 override fun setType(`type` : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_type = `type`
}

override fun getRequiredLibs() : List<org.kevoree.DeployUnit> {
return if(_requiredLibs_java_cache != null){
_requiredLibs_java_cache as List<org.kevoree.DeployUnit>
} else {
val tempL = java.util.ArrayList<org.kevoree.DeployUnit>()
tempL.addAll(_requiredLibs.values().toList())
_requiredLibs_java_cache = tempL
tempL
}
}

override fun setRequiredLibs(requiredLibs : List<org.kevoree.DeployUnit> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(requiredLibs == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_requiredLibs_java_cache=null
if(_requiredLibs!= requiredLibs){
_requiredLibs.clear()
for(el in requiredLibs){
_requiredLibs.put(el.getName(),el)
}
}

}

override fun addRequiredLibs(requiredLibs : org.kevoree.DeployUnit) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_requiredLibs_java_cache=null
_requiredLibs.put(requiredLibs.getName(),requiredLibs)
}

override fun addAllRequiredLibs(requiredLibs :List<org.kevoree.DeployUnit>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_requiredLibs_java_cache=null
for(el in requiredLibs){
_requiredLibs.put(el.getName(),el)
}
}


override fun removeRequiredLibs(requiredLibs : org.kevoree.DeployUnit) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_requiredLibs_java_cache=null
if(_requiredLibs.size() != 0 && _requiredLibs.containsKey(requiredLibs.getName())) {
_requiredLibs.remove(requiredLibs.getName())
}
}

override fun removeAllRequiredLibs() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_requiredLibs_java_cache=null
_requiredLibs.clear()
}

override fun getTargetNodeType() : org.kevoree.NodeType? {
return _targetNodeType
}

override fun setTargetNodeType(targetNodeType : org.kevoree.NodeType? ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(_targetNodeType!= targetNodeType){
_targetNodeType = (targetNodeType)
}

}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createDeployUnit()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setGroupName(this.getGroupName())
		selfObjectClone.setUnitName(this.getUnitName())
		selfObjectClone.setVersion(this.getVersion())
		selfObjectClone.setUrl(this.getUrl())
		selfObjectClone.setHashcode(this.getHashcode())
		selfObjectClone.setType(this.getType())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.DeployUnitInternal
for(sub in this.getRequiredLibs()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addRequiredLibs(sub)
} else {
clonedSelfObject.addRequiredLibs(addrs.get(sub) as org.kevoree.DeployUnit)
}
		}

if(this.getTargetNodeType()!=null){
if(mutableOnly && this.getTargetNodeType()!!.isRecursiveReadOnly()){
clonedSelfObject.setTargetNodeType(this.getTargetNodeType()!!)
} else {
clonedSelfObject.setTargetNodeType(addrs.get(this.getTargetNodeType()) as org.kevoree.NodeType)
}
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
override fun findRequiredLibsByID(key : String) : org.kevoree.DeployUnit? {
return _requiredLibs.get(key)
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
"requiredLibs" -> {
val objFound = findRequiredLibsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"targetNodeType" -> {
getTargetNodeType()
}
else -> {}
}
}
}
