package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait RepositoryInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.Repository , org.kevoree.impl.NamedElementInternal {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getUnits()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _url : String
internal var _units_java_cache : List<org.kevoree.DeployUnit>?
internal val _units : java.util.HashMap<Any,org.kevoree.DeployUnit>
override fun delete(){
_units?.clear()
_units_java_cache = null
}
override fun getUrl() : String {
 return _url
}

 override fun setUrl(url : String) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_url = url
}

override fun getUnits() : List<org.kevoree.DeployUnit> {
return if(_units_java_cache != null){
_units_java_cache as List<org.kevoree.DeployUnit>
} else {
val tempL = java.util.ArrayList<org.kevoree.DeployUnit>()
tempL.addAll(_units.values().toList())
_units_java_cache = tempL
tempL
}
}

override fun setUnits(units : List<org.kevoree.DeployUnit> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(units == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_units_java_cache=null
if(_units!= units){
_units.clear()
for(el in units){
_units.put(el.getName(),el)
}
}

}

override fun addUnits(units : org.kevoree.DeployUnit) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_units_java_cache=null
_units.put(units.getName(),units)
}

override fun addAllUnits(units :List<org.kevoree.DeployUnit>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_units_java_cache=null
for(el in units){
_units.put(el.getName(),el)
}
}


override fun removeUnits(units : org.kevoree.DeployUnit) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_units_java_cache=null
if(_units.size() != 0 && _units.containsKey(units.getName())) {
_units.remove(units.getName())
}
}

override fun removeAllUnits() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_units_java_cache=null
_units.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createRepository()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setUrl(this.getUrl())
		subResult.put(this,selfObjectClone)
	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.RepositoryInternal
for(sub in this.getUnits()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addUnits(sub)
} else {
clonedSelfObject.addUnits(addrs.get(sub) as org.kevoree.DeployUnit)
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
override fun findUnitsByID(key : String) : org.kevoree.DeployUnit? {
return _units.get(key)
}
override fun findByPath(query : String) : Any? {
val firstSepIndex = query.indexOf('[')
var queryID = ""
var extraReadChar = 2
val relationName = "units"
val optionalDetected = ( firstSepIndex != 5 )
if(optionalDetected){ extraReadChar = extraReadChar - 2 }
if(query.indexOf('{') == 0){
queryID = query.substring(query.indexOf('{')+1,query.indexOf('}'))
extraReadChar = extraReadChar + 2
} else {
if(optionalDetected){
if(query.indexOf('/') != - 1){
queryID = query.substring(0,query.indexOf('/'))
} else {
queryID = query.substring(0,query.size)
}
} else {
queryID = query.substring(query.indexOf('[')+1,query.indexOf(']'))
}
}
var subquery = query.substring((if(optionalDetected){0} else {relationName.size})+queryID.size+extraReadChar,query.size)
if (subquery.indexOf('/') != -1){
subquery = subquery.substring(subquery.indexOf('/')+1,subquery.size)
}
return when(relationName) {
"units" -> {
val objFound = findUnitsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
else -> {}
}
}
}
