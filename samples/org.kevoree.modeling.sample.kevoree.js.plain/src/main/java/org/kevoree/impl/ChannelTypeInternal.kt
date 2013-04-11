package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ChannelTypeInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.ChannelType , org.kevoree.impl.LifeCycleTypeDefinitionInternal {
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
internal var _lowerBindings : Int
internal var _upperBindings : Int
internal var _lowerFragments : Int
internal var _upperFragments : Int
override fun delete(){
_dictionaryType?.delete()
}
override fun getLowerBindings() : Int {
 return _lowerBindings
}

 override fun setLowerBindings(lowerBindings : Int) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_lowerBindings = lowerBindings
}
override fun getUpperBindings() : Int {
 return _upperBindings
}

 override fun setUpperBindings(upperBindings : Int) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_upperBindings = upperBindings
}
override fun getLowerFragments() : Int {
 return _lowerFragments
}

 override fun setLowerFragments(lowerFragments : Int) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_lowerFragments = lowerFragments
}
override fun getUpperFragments() : Int {
 return _upperFragments
}

 override fun setUpperFragments(upperFragments : Int) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_upperFragments = upperFragments
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createChannelType()
		selfObjectClone.setName(this.getName())
		selfObjectClone.setFactoryBean(this.getFactoryBean())
		selfObjectClone.setBean(this.getBean())
		selfObjectClone.setStartMethod(this.getStartMethod())
		selfObjectClone.setStopMethod(this.getStopMethod())
		selfObjectClone.setUpdateMethod(this.getUpdateMethod())
		selfObjectClone.setLowerBindings(this.getLowerBindings())
		selfObjectClone.setUpperBindings(this.getUpperBindings())
		selfObjectClone.setLowerFragments(this.getLowerFragments())
		selfObjectClone.setUpperFragments(this.getUpperFragments())
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
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.ChannelTypeInternal
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
}
