package org.kevoree.impl

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ContainerRootInternal : org.kevoree.container.KMFContainerImpl, org.kevoree.ContainerRoot {
override fun setRecursiveReadOnly(){
if(internal_recursive_readOnlyElem == true){return}
internal_recursive_readOnlyElem = true
for(sub in this.getNodes()){
sub.setRecursiveReadOnly()
}

for(sub in this.getTypeDefinitions()){
sub.setRecursiveReadOnly()
}

for(sub in this.getRepositories()){
sub.setRecursiveReadOnly()
}

for(sub in this.getDataTypes()){
sub.setRecursiveReadOnly()
}

for(sub in this.getLibraries()){
sub.setRecursiveReadOnly()
}

for(sub in this.getHubs()){
sub.setRecursiveReadOnly()
}

for(sub in this.getMBindings()){
sub.setRecursiveReadOnly()
}

for(sub in this.getDeployUnits()){
sub.setRecursiveReadOnly()
}

for(sub in this.getNodeNetworks()){
sub.setRecursiveReadOnly()
}

for(sub in this.getGroups()){
sub.setRecursiveReadOnly()
}

for(sub in this.getGroupTypes()){
sub.setRecursiveReadOnly()
}

for(sub in this.getAdaptationPrimitiveTypes()){
sub.setRecursiveReadOnly()
}

setInternalReadOnly()
}
internal var _nodes_java_cache : List<org.kevoree.ContainerNode>?
internal val _nodes : java.util.HashMap<Any,org.kevoree.ContainerNode>
internal var _typeDefinitions_java_cache : List<org.kevoree.TypeDefinition>?
internal val _typeDefinitions : java.util.HashMap<Any,org.kevoree.TypeDefinition>
internal var _repositories_java_cache : List<org.kevoree.Repository>?
internal val _repositories : java.util.HashMap<Any,org.kevoree.Repository>
internal var _dataTypes_java_cache : List<org.kevoree.TypedElement>?
internal val _dataTypes : java.util.HashMap<Any,org.kevoree.TypedElement>
internal var _libraries_java_cache : List<org.kevoree.TypeLibrary>?
internal val _libraries : java.util.HashMap<Any,org.kevoree.TypeLibrary>
internal var _hubs_java_cache : List<org.kevoree.Channel>?
internal val _hubs : java.util.HashMap<Any,org.kevoree.Channel>
internal var _mBindings_java_cache : List<org.kevoree.MBinding>?
internal val _mBindings :MutableList<org.kevoree.MBinding>
internal var _deployUnits_java_cache : List<org.kevoree.DeployUnit>?
internal val _deployUnits : java.util.HashMap<Any,org.kevoree.DeployUnit>
internal var _nodeNetworks_java_cache : List<org.kevoree.NodeNetwork>?
internal val _nodeNetworks :MutableList<org.kevoree.NodeNetwork>
internal var _groups_java_cache : List<org.kevoree.Group>?
internal val _groups : java.util.HashMap<Any,org.kevoree.Group>
internal var _groupTypes_java_cache : List<org.kevoree.GroupType>?
internal val _groupTypes : java.util.HashMap<Any,org.kevoree.GroupType>
internal var _adaptationPrimitiveTypes_java_cache : List<org.kevoree.AdaptationPrimitiveType>?
internal val _adaptationPrimitiveTypes : java.util.HashMap<Any,org.kevoree.AdaptationPrimitiveType>
override fun delete(){
for(el in _nodes){
el.value.delete()
}
for(el in _typeDefinitions){
el.value.delete()
}
for(el in _repositories){
el.value.delete()
}
for(el in _dataTypes){
el.value.delete()
}
for(el in _libraries){
el.value.delete()
}
for(el in _hubs){
el.value.delete()
}
for(el in _mBindings){
el.delete()
}
for(el in _deployUnits){
el.value.delete()
}
for(el in _nodeNetworks){
el.delete()
}
for(el in _groups){
el.value.delete()
}
for(el in _groupTypes){
el.value.delete()
}
for(el in _adaptationPrimitiveTypes){
el.value.delete()
}
_nodes?.clear()
_nodes_java_cache = null
_typeDefinitions?.clear()
_typeDefinitions_java_cache = null
_repositories?.clear()
_repositories_java_cache = null
_dataTypes?.clear()
_dataTypes_java_cache = null
_libraries?.clear()
_libraries_java_cache = null
_hubs?.clear()
_hubs_java_cache = null
_mBindings?.clear()
_mBindings_java_cache = null
_deployUnits?.clear()
_deployUnits_java_cache = null
_nodeNetworks?.clear()
_nodeNetworks_java_cache = null
_groups?.clear()
_groups_java_cache = null
_groupTypes?.clear()
_groupTypes_java_cache = null
_adaptationPrimitiveTypes?.clear()
_adaptationPrimitiveTypes_java_cache = null
}

override fun getNodes() : List<org.kevoree.ContainerNode> {
return if(_nodes_java_cache != null){
_nodes_java_cache as List<org.kevoree.ContainerNode>
} else {
val tempL = java.util.ArrayList<org.kevoree.ContainerNode>()
tempL.addAll(_nodes.values().toList())
_nodes_java_cache = tempL
tempL
}
}

override fun setNodes(nodes : List<org.kevoree.ContainerNode> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(nodes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_nodes_java_cache=null
if(_nodes!= nodes){
_nodes.clear()
for(el in nodes){
_nodes.put(el.getName(),el)
}
for(elem in nodes){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNodes(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("nodes")
}
}

}

override fun addNodes(nodes : org.kevoree.ContainerNode) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_nodes_java_cache=null
(nodes as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNodes(nodes)})
(nodes as org.kevoree.container.KMFContainerImpl).setContainmentRefName("nodes")
_nodes.put(nodes.getName(),nodes)
}

override fun addAllNodes(nodes :List<org.kevoree.ContainerNode>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_nodes_java_cache=null
for(el in nodes){
_nodes.put(el.getName(),el)
}
for(el in nodes){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNodes(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("nodes")
}
}


override fun removeNodes(nodes : org.kevoree.ContainerNode) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_nodes_java_cache=null
if(_nodes.size() != 0 && _nodes.containsKey(nodes.getName())) {
_nodes.remove(nodes.getName())
(nodes!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(nodes!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllNodes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getNodes()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_nodes_java_cache=null
_nodes.clear()
}

override fun getTypeDefinitions() : List<org.kevoree.TypeDefinition> {
return if(_typeDefinitions_java_cache != null){
_typeDefinitions_java_cache as List<org.kevoree.TypeDefinition>
} else {
val tempL = java.util.ArrayList<org.kevoree.TypeDefinition>()
tempL.addAll(_typeDefinitions.values().toList())
_typeDefinitions_java_cache = tempL
tempL
}
}

override fun setTypeDefinitions(typeDefinitions : List<org.kevoree.TypeDefinition> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(typeDefinitions == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_typeDefinitions_java_cache=null
if(_typeDefinitions!= typeDefinitions){
_typeDefinitions.clear()
for(el in typeDefinitions){
_typeDefinitions.put(el.getName(),el)
}
for(elem in typeDefinitions){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeTypeDefinitions(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("typeDefinitions")
}
}

}

override fun addTypeDefinitions(typeDefinitions : org.kevoree.TypeDefinition) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_typeDefinitions_java_cache=null
(typeDefinitions as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeTypeDefinitions(typeDefinitions)})
(typeDefinitions as org.kevoree.container.KMFContainerImpl).setContainmentRefName("typeDefinitions")
_typeDefinitions.put(typeDefinitions.getName(),typeDefinitions)
}

override fun addAllTypeDefinitions(typeDefinitions :List<org.kevoree.TypeDefinition>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_typeDefinitions_java_cache=null
for(el in typeDefinitions){
_typeDefinitions.put(el.getName(),el)
}
for(el in typeDefinitions){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeTypeDefinitions(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("typeDefinitions")
}
}


override fun removeTypeDefinitions(typeDefinitions : org.kevoree.TypeDefinition) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_typeDefinitions_java_cache=null
if(_typeDefinitions.size() != 0 && _typeDefinitions.containsKey(typeDefinitions.getName())) {
_typeDefinitions.remove(typeDefinitions.getName())
(typeDefinitions!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(typeDefinitions!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllTypeDefinitions() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getTypeDefinitions()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_typeDefinitions_java_cache=null
_typeDefinitions.clear()
}

override fun getRepositories() : List<org.kevoree.Repository> {
return if(_repositories_java_cache != null){
_repositories_java_cache as List<org.kevoree.Repository>
} else {
val tempL = java.util.ArrayList<org.kevoree.Repository>()
tempL.addAll(_repositories.values().toList())
_repositories_java_cache = tempL
tempL
}
}

override fun setRepositories(repositories : List<org.kevoree.Repository> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(repositories == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_repositories_java_cache=null
if(_repositories!= repositories){
_repositories.clear()
for(el in repositories){
_repositories.put(el.getName(),el)
}
for(elem in repositories){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRepositories(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("repositories")
}
}

}

override fun addRepositories(repositories : org.kevoree.Repository) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_repositories_java_cache=null
(repositories as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRepositories(repositories)})
(repositories as org.kevoree.container.KMFContainerImpl).setContainmentRefName("repositories")
_repositories.put(repositories.getName(),repositories)
}

override fun addAllRepositories(repositories :List<org.kevoree.Repository>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_repositories_java_cache=null
for(el in repositories){
_repositories.put(el.getName(),el)
}
for(el in repositories){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeRepositories(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("repositories")
}
}


override fun removeRepositories(repositories : org.kevoree.Repository) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_repositories_java_cache=null
if(_repositories.size() != 0 && _repositories.containsKey(repositories.getName())) {
_repositories.remove(repositories.getName())
(repositories!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(repositories!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllRepositories() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getRepositories()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_repositories_java_cache=null
_repositories.clear()
}

override fun getDataTypes() : List<org.kevoree.TypedElement> {
return if(_dataTypes_java_cache != null){
_dataTypes_java_cache as List<org.kevoree.TypedElement>
} else {
val tempL = java.util.ArrayList<org.kevoree.TypedElement>()
tempL.addAll(_dataTypes.values().toList())
_dataTypes_java_cache = tempL
tempL
}
}

override fun setDataTypes(dataTypes : List<org.kevoree.TypedElement> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(dataTypes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_dataTypes_java_cache=null
if(_dataTypes!= dataTypes){
_dataTypes.clear()
for(el in dataTypes){
_dataTypes.put(el.getName(),el)
}
for(elem in dataTypes){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDataTypes(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("dataTypes")
}
}

}

override fun addDataTypes(dataTypes : org.kevoree.TypedElement) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_dataTypes_java_cache=null
(dataTypes as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDataTypes(dataTypes)})
(dataTypes as org.kevoree.container.KMFContainerImpl).setContainmentRefName("dataTypes")
_dataTypes.put(dataTypes.getName(),dataTypes)
}

override fun addAllDataTypes(dataTypes :List<org.kevoree.TypedElement>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_dataTypes_java_cache=null
for(el in dataTypes){
_dataTypes.put(el.getName(),el)
}
for(el in dataTypes){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDataTypes(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("dataTypes")
}
}


override fun removeDataTypes(dataTypes : org.kevoree.TypedElement) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_dataTypes_java_cache=null
if(_dataTypes.size() != 0 && _dataTypes.containsKey(dataTypes.getName())) {
_dataTypes.remove(dataTypes.getName())
(dataTypes!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(dataTypes!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllDataTypes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getDataTypes()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_dataTypes_java_cache=null
_dataTypes.clear()
}

override fun getLibraries() : List<org.kevoree.TypeLibrary> {
return if(_libraries_java_cache != null){
_libraries_java_cache as List<org.kevoree.TypeLibrary>
} else {
val tempL = java.util.ArrayList<org.kevoree.TypeLibrary>()
tempL.addAll(_libraries.values().toList())
_libraries_java_cache = tempL
tempL
}
}

override fun setLibraries(libraries : List<org.kevoree.TypeLibrary> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(libraries == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_libraries_java_cache=null
if(_libraries!= libraries){
_libraries.clear()
for(el in libraries){
_libraries.put(el.getName(),el)
}
for(elem in libraries){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeLibraries(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("libraries")
}
}

}

override fun addLibraries(libraries : org.kevoree.TypeLibrary) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_libraries_java_cache=null
(libraries as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeLibraries(libraries)})
(libraries as org.kevoree.container.KMFContainerImpl).setContainmentRefName("libraries")
_libraries.put(libraries.getName(),libraries)
}

override fun addAllLibraries(libraries :List<org.kevoree.TypeLibrary>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_libraries_java_cache=null
for(el in libraries){
_libraries.put(el.getName(),el)
}
for(el in libraries){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeLibraries(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("libraries")
}
}


override fun removeLibraries(libraries : org.kevoree.TypeLibrary) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_libraries_java_cache=null
if(_libraries.size() != 0 && _libraries.containsKey(libraries.getName())) {
_libraries.remove(libraries.getName())
(libraries!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(libraries!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllLibraries() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getLibraries()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_libraries_java_cache=null
_libraries.clear()
}

override fun getHubs() : List<org.kevoree.Channel> {
return if(_hubs_java_cache != null){
_hubs_java_cache as List<org.kevoree.Channel>
} else {
val tempL = java.util.ArrayList<org.kevoree.Channel>()
tempL.addAll(_hubs.values().toList())
_hubs_java_cache = tempL
tempL
}
}

override fun setHubs(hubs : List<org.kevoree.Channel> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(hubs == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_hubs_java_cache=null
if(_hubs!= hubs){
_hubs.clear()
for(el in hubs){
_hubs.put(el.getName(),el)
}
for(elem in hubs){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeHubs(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("hubs")
}
}

}

override fun addHubs(hubs : org.kevoree.Channel) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_hubs_java_cache=null
(hubs as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeHubs(hubs)})
(hubs as org.kevoree.container.KMFContainerImpl).setContainmentRefName("hubs")
_hubs.put(hubs.getName(),hubs)
}

override fun addAllHubs(hubs :List<org.kevoree.Channel>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_hubs_java_cache=null
for(el in hubs){
_hubs.put(el.getName(),el)
}
for(el in hubs){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeHubs(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("hubs")
}
}


override fun removeHubs(hubs : org.kevoree.Channel) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_hubs_java_cache=null
if(_hubs.size() != 0 && _hubs.containsKey(hubs.getName())) {
_hubs.remove(hubs.getName())
(hubs!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(hubs!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllHubs() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getHubs()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_hubs_java_cache=null
_hubs.clear()
}

override fun getMBindings() : List<org.kevoree.MBinding> {
return if(_mBindings_java_cache != null){
_mBindings_java_cache as List<org.kevoree.MBinding>
} else {
val tempL = java.util.ArrayList<org.kevoree.MBinding>()
tempL.addAll(_mBindings)
_mBindings_java_cache = tempL
tempL
}
}

override fun setMBindings(mBindings : List<org.kevoree.MBinding> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(mBindings == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_mBindings_java_cache=null
if(_mBindings!= mBindings){
_mBindings.clear()
_mBindings.addAll(mBindings)
for(elem in mBindings){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeMBindings(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("mBindings")
}
}

}

override fun addMBindings(mBindings : org.kevoree.MBinding) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_mBindings_java_cache=null
(mBindings as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeMBindings(mBindings)})
(mBindings as org.kevoree.container.KMFContainerImpl).setContainmentRefName("mBindings")
_mBindings.add(mBindings)
}

override fun addAllMBindings(mBindings :List<org.kevoree.MBinding>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_mBindings_java_cache=null
_mBindings.addAll(mBindings)
for(el in mBindings){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeMBindings(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("mBindings")
}
}


override fun removeMBindings(mBindings : org.kevoree.MBinding) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_mBindings_java_cache=null
if(_mBindings.size() != 0 && _mBindings.indexOf(mBindings) != -1 ) {
_mBindings.remove(_mBindings.indexOf(mBindings))
(mBindings!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(mBindings!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllMBindings() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getMBindings())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_mBindings_java_cache=null
_mBindings.clear()
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
for(elem in deployUnits){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDeployUnits(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("deployUnits")
}
}

}

override fun addDeployUnits(deployUnits : org.kevoree.DeployUnit) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_deployUnits_java_cache=null
(deployUnits as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDeployUnits(deployUnits)})
(deployUnits as org.kevoree.container.KMFContainerImpl).setContainmentRefName("deployUnits")
_deployUnits.put(deployUnits.getName(),deployUnits)
}

override fun addAllDeployUnits(deployUnits :List<org.kevoree.DeployUnit>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_deployUnits_java_cache=null
for(el in deployUnits){
_deployUnits.put(el.getName(),el)
}
for(el in deployUnits){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeDeployUnits(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("deployUnits")
}
}


override fun removeDeployUnits(deployUnits : org.kevoree.DeployUnit) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_deployUnits_java_cache=null
if(_deployUnits.size() != 0 && _deployUnits.containsKey(deployUnits.getName())) {
_deployUnits.remove(deployUnits.getName())
(deployUnits!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(deployUnits!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllDeployUnits() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getDeployUnits()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_deployUnits_java_cache=null
_deployUnits.clear()
}

override fun getNodeNetworks() : List<org.kevoree.NodeNetwork> {
return if(_nodeNetworks_java_cache != null){
_nodeNetworks_java_cache as List<org.kevoree.NodeNetwork>
} else {
val tempL = java.util.ArrayList<org.kevoree.NodeNetwork>()
tempL.addAll(_nodeNetworks)
_nodeNetworks_java_cache = tempL
tempL
}
}

override fun setNodeNetworks(nodeNetworks : List<org.kevoree.NodeNetwork> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(nodeNetworks == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_nodeNetworks_java_cache=null
if(_nodeNetworks!= nodeNetworks){
_nodeNetworks.clear()
_nodeNetworks.addAll(nodeNetworks)
for(elem in nodeNetworks){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNodeNetworks(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("nodeNetworks")
}
}

}

override fun addNodeNetworks(nodeNetworks : org.kevoree.NodeNetwork) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_nodeNetworks_java_cache=null
(nodeNetworks as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNodeNetworks(nodeNetworks)})
(nodeNetworks as org.kevoree.container.KMFContainerImpl).setContainmentRefName("nodeNetworks")
_nodeNetworks.add(nodeNetworks)
}

override fun addAllNodeNetworks(nodeNetworks :List<org.kevoree.NodeNetwork>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_nodeNetworks_java_cache=null
_nodeNetworks.addAll(nodeNetworks)
for(el in nodeNetworks){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeNodeNetworks(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("nodeNetworks")
}
}


override fun removeNodeNetworks(nodeNetworks : org.kevoree.NodeNetwork) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_nodeNetworks_java_cache=null
if(_nodeNetworks.size() != 0 && _nodeNetworks.indexOf(nodeNetworks) != -1 ) {
_nodeNetworks.remove(_nodeNetworks.indexOf(nodeNetworks))
(nodeNetworks!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(nodeNetworks!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllNodeNetworks() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
val temp_els = (getNodeNetworks())
for(el in temp_els){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_nodeNetworks_java_cache=null
_nodeNetworks.clear()
}

override fun getGroups() : List<org.kevoree.Group> {
return if(_groups_java_cache != null){
_groups_java_cache as List<org.kevoree.Group>
} else {
val tempL = java.util.ArrayList<org.kevoree.Group>()
tempL.addAll(_groups.values().toList())
_groups_java_cache = tempL
tempL
}
}

override fun setGroups(groups : List<org.kevoree.Group> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(groups == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_groups_java_cache=null
if(_groups!= groups){
_groups.clear()
for(el in groups){
_groups.put(el.getName(),el)
}
for(elem in groups){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeGroups(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("groups")
}
}

}

override fun addGroups(groups : org.kevoree.Group) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_groups_java_cache=null
(groups as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeGroups(groups)})
(groups as org.kevoree.container.KMFContainerImpl).setContainmentRefName("groups")
_groups.put(groups.getName(),groups)
}

override fun addAllGroups(groups :List<org.kevoree.Group>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_groups_java_cache=null
for(el in groups){
_groups.put(el.getName(),el)
}
for(el in groups){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeGroups(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("groups")
}
}


override fun removeGroups(groups : org.kevoree.Group) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_groups_java_cache=null
if(_groups.size() != 0 && _groups.containsKey(groups.getName())) {
_groups.remove(groups.getName())
(groups!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(groups!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllGroups() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getGroups()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_groups_java_cache=null
_groups.clear()
}

override fun getGroupTypes() : List<org.kevoree.GroupType> {
return if(_groupTypes_java_cache != null){
_groupTypes_java_cache as List<org.kevoree.GroupType>
} else {
val tempL = java.util.ArrayList<org.kevoree.GroupType>()
tempL.addAll(_groupTypes.values().toList())
_groupTypes_java_cache = tempL
tempL
}
}

override fun setGroupTypes(groupTypes : List<org.kevoree.GroupType> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(groupTypes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_groupTypes_java_cache=null
if(_groupTypes!= groupTypes){
_groupTypes.clear()
for(el in groupTypes){
_groupTypes.put(el.getName(),el)
}
for(elem in groupTypes){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeGroupTypes(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("groupTypes")
}
}

}

override fun addGroupTypes(groupTypes : org.kevoree.GroupType) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_groupTypes_java_cache=null
(groupTypes as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeGroupTypes(groupTypes)})
(groupTypes as org.kevoree.container.KMFContainerImpl).setContainmentRefName("groupTypes")
_groupTypes.put(groupTypes.getName(),groupTypes)
}

override fun addAllGroupTypes(groupTypes :List<org.kevoree.GroupType>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_groupTypes_java_cache=null
for(el in groupTypes){
_groupTypes.put(el.getName(),el)
}
for(el in groupTypes){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeGroupTypes(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("groupTypes")
}
}


override fun removeGroupTypes(groupTypes : org.kevoree.GroupType) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_groupTypes_java_cache=null
if(_groupTypes.size() != 0 && _groupTypes.containsKey(groupTypes.getName())) {
_groupTypes.remove(groupTypes.getName())
(groupTypes!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(groupTypes!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllGroupTypes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getGroupTypes()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_groupTypes_java_cache=null
_groupTypes.clear()
}

override fun getAdaptationPrimitiveTypes() : List<org.kevoree.AdaptationPrimitiveType> {
return if(_adaptationPrimitiveTypes_java_cache != null){
_adaptationPrimitiveTypes_java_cache as List<org.kevoree.AdaptationPrimitiveType>
} else {
val tempL = java.util.ArrayList<org.kevoree.AdaptationPrimitiveType>()
tempL.addAll(_adaptationPrimitiveTypes.values().toList())
_adaptationPrimitiveTypes_java_cache = tempL
tempL
}
}

override fun setAdaptationPrimitiveTypes(adaptationPrimitiveTypes : List<org.kevoree.AdaptationPrimitiveType> ) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
if(adaptationPrimitiveTypes == null){ throw IllegalArgumentException("The list in parameter of the setter cannot be null. Use removeAll to empty a collection.") }
_adaptationPrimitiveTypes_java_cache=null
if(_adaptationPrimitiveTypes!= adaptationPrimitiveTypes){
_adaptationPrimitiveTypes.clear()
for(el in adaptationPrimitiveTypes){
_adaptationPrimitiveTypes.put(el.getName(),el)
}
for(elem in adaptationPrimitiveTypes){
(elem as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeAdaptationPrimitiveTypes(elem)})
(elem as org.kevoree.container.KMFContainerImpl).setContainmentRefName("adaptationPrimitiveTypes")
}
}

}

override fun addAdaptationPrimitiveTypes(adaptationPrimitiveTypes : org.kevoree.AdaptationPrimitiveType) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_adaptationPrimitiveTypes_java_cache=null
(adaptationPrimitiveTypes as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeAdaptationPrimitiveTypes(adaptationPrimitiveTypes)})
(adaptationPrimitiveTypes as org.kevoree.container.KMFContainerImpl).setContainmentRefName("adaptationPrimitiveTypes")
_adaptationPrimitiveTypes.put(adaptationPrimitiveTypes.getName(),adaptationPrimitiveTypes)
}

override fun addAllAdaptationPrimitiveTypes(adaptationPrimitiveTypes :List<org.kevoree.AdaptationPrimitiveType>) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_adaptationPrimitiveTypes_java_cache=null
for(el in adaptationPrimitiveTypes){
_adaptationPrimitiveTypes.put(el.getName(),el)
}
for(el in adaptationPrimitiveTypes){
(el as org.kevoree.container.KMFContainerImpl).setEContainer(this,{()->this.removeAdaptationPrimitiveTypes(el)})
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName("adaptationPrimitiveTypes")
}
}


override fun removeAdaptationPrimitiveTypes(adaptationPrimitiveTypes : org.kevoree.AdaptationPrimitiveType) {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
_adaptationPrimitiveTypes_java_cache=null
if(_adaptationPrimitiveTypes.size() != 0 && _adaptationPrimitiveTypes.containsKey(adaptationPrimitiveTypes.getName())) {
_adaptationPrimitiveTypes.remove(adaptationPrimitiveTypes.getName())
(adaptationPrimitiveTypes!! as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(adaptationPrimitiveTypes!! as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
}

override fun removeAllAdaptationPrimitiveTypes() {
if(isReadOnly()){throw Exception("This model is ReadOnly. Elements are not modifiable.")}
for(elm in getAdaptationPrimitiveTypes()!!){
val el = elm
(el as org.kevoree.container.KMFContainerImpl).setEContainer(null,null)
(el as org.kevoree.container.KMFContainerImpl).setContainmentRefName(null)
}
_adaptationPrimitiveTypes_java_cache=null
_adaptationPrimitiveTypes.clear()
}
override fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean) {
if(mutableOnly && isRecursiveReadOnly()){return}
		val selfObjectClone = _factories.getKevoreeFactory().createContainerRoot()
		subResult.put(this,selfObjectClone)
for(sub in this.getNodes()){
(sub as org.kevoree.impl.ContainerNodeInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getTypeDefinitions()){
(sub as org.kevoree.impl.TypeDefinitionInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getRepositories()){
(sub as org.kevoree.impl.RepositoryInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getDataTypes()){
(sub as org.kevoree.impl.TypedElementInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getLibraries()){
(sub as org.kevoree.impl.TypeLibraryInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getHubs()){
(sub as org.kevoree.impl.ChannelInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getMBindings()){
(sub as org.kevoree.impl.MBindingInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getDeployUnits()){
(sub as org.kevoree.impl.DeployUnitInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getNodeNetworks()){
(sub as org.kevoree.impl.NodeNetworkInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getGroups()){
(sub as org.kevoree.impl.GroupInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getGroupTypes()){
(sub as org.kevoree.impl.GroupTypeInternal).getClonelazy(subResult, _factories,mutableOnly)
}

for(sub in this.getAdaptationPrimitiveTypes()){
(sub as org.kevoree.impl.AdaptationPrimitiveTypeInternal).getClonelazy(subResult, _factories,mutableOnly)
}

	}
override fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any {
if(mutableOnly && isRecursiveReadOnly()){
return this
}
val clonedSelfObject = addrs.get(this) as org.kevoree.impl.ContainerRootInternal
for(sub in this.getNodes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addNodes(sub)
} else {
clonedSelfObject.addNodes(addrs.get(sub) as org.kevoree.ContainerNode)
}
		}

for(sub in this.getTypeDefinitions()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addTypeDefinitions(sub)
} else {
clonedSelfObject.addTypeDefinitions(addrs.get(sub) as org.kevoree.TypeDefinition)
}
		}

for(sub in this.getRepositories()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addRepositories(sub)
} else {
clonedSelfObject.addRepositories(addrs.get(sub) as org.kevoree.Repository)
}
		}

for(sub in this.getDataTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addDataTypes(sub)
} else {
clonedSelfObject.addDataTypes(addrs.get(sub) as org.kevoree.TypedElement)
}
		}

for(sub in this.getLibraries()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addLibraries(sub)
} else {
clonedSelfObject.addLibraries(addrs.get(sub) as org.kevoree.TypeLibrary)
}
		}

for(sub in this.getHubs()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addHubs(sub)
} else {
clonedSelfObject.addHubs(addrs.get(sub) as org.kevoree.Channel)
}
		}

for(sub in this.getMBindings()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addMBindings(sub)
} else {
clonedSelfObject.addMBindings(addrs.get(sub) as org.kevoree.MBinding)
}
		}

for(sub in this.getDeployUnits()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addDeployUnits(sub)
} else {
clonedSelfObject.addDeployUnits(addrs.get(sub) as org.kevoree.DeployUnit)
}
		}

for(sub in this.getNodeNetworks()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addNodeNetworks(sub)
} else {
clonedSelfObject.addNodeNetworks(addrs.get(sub) as org.kevoree.NodeNetwork)
}
		}

for(sub in this.getGroups()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addGroups(sub)
} else {
clonedSelfObject.addGroups(addrs.get(sub) as org.kevoree.Group)
}
		}

for(sub in this.getGroupTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addGroupTypes(sub)
} else {
clonedSelfObject.addGroupTypes(addrs.get(sub) as org.kevoree.GroupType)
}
		}

for(sub in this.getAdaptationPrimitiveTypes()){
if(mutableOnly && sub.isRecursiveReadOnly()){
clonedSelfObject.addAdaptationPrimitiveTypes(sub)
} else {
clonedSelfObject.addAdaptationPrimitiveTypes(addrs.get(sub) as org.kevoree.AdaptationPrimitiveType)
}
		}

for(sub in this.getNodes()){
			(sub as org.kevoree.impl.ContainerNodeInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getTypeDefinitions()){
			(sub as org.kevoree.impl.TypeDefinitionInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getRepositories()){
			(sub as org.kevoree.impl.RepositoryInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getDataTypes()){
			(sub as org.kevoree.impl.TypedElementInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getLibraries()){
			(sub as org.kevoree.impl.TypeLibraryInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getHubs()){
			(sub as org.kevoree.impl.ChannelInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getMBindings()){
			(sub as org.kevoree.impl.MBindingInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getDeployUnits()){
			(sub as org.kevoree.impl.DeployUnitInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getNodeNetworks()){
			(sub as org.kevoree.impl.NodeNetworkInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getGroups()){
			(sub as org.kevoree.impl.GroupInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getGroupTypes()){
			(sub as org.kevoree.impl.GroupTypeInternal ).resolve(addrs,readOnly,mutableOnly)
		}

for(sub in this.getAdaptationPrimitiveTypes()){
			(sub as org.kevoree.impl.AdaptationPrimitiveTypeInternal ).resolve(addrs,readOnly,mutableOnly)
		}

		if(readOnly){clonedSelfObject.setInternalReadOnly()}
return clonedSelfObject
}
override fun path() : String? {
return null
}
override fun findNodesByID(key : String) : org.kevoree.ContainerNode? {
return _nodes.get(key)
}
override fun findTypeDefinitionsByID(key : String) : org.kevoree.TypeDefinition? {
return _typeDefinitions.get(key)
}
override fun findRepositoriesByID(key : String) : org.kevoree.Repository? {
return _repositories.get(key)
}
override fun findDataTypesByID(key : String) : org.kevoree.TypedElement? {
return _dataTypes.get(key)
}
override fun findLibrariesByID(key : String) : org.kevoree.TypeLibrary? {
return _libraries.get(key)
}
override fun findHubsByID(key : String) : org.kevoree.Channel? {
return _hubs.get(key)
}
override fun findDeployUnitsByID(key : String) : org.kevoree.DeployUnit? {
return _deployUnits.get(key)
}
override fun findGroupsByID(key : String) : org.kevoree.Group? {
return _groups.get(key)
}
override fun findGroupTypesByID(key : String) : org.kevoree.GroupType? {
return _groupTypes.get(key)
}
override fun findAdaptationPrimitiveTypesByID(key : String) : org.kevoree.AdaptationPrimitiveType? {
return _adaptationPrimitiveTypes.get(key)
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
"nodes" -> {
val objFound = findNodesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"typeDefinitions" -> {
val objFound = findTypeDefinitionsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"repositories" -> {
val objFound = findRepositoriesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"dataTypes" -> {
val objFound = findDataTypesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"libraries" -> {
val objFound = findLibrariesByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"hubs" -> {
val objFound = findHubsByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
"deployUnits" -> {
val objFound = findDeployUnitsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"groups" -> {
val objFound = findGroupsByID(queryID)
if(subquery != "" && objFound != null){
objFound.findByPath(subquery)
} else {objFound}
}
"groupTypes" -> {
val objFound = findGroupTypesByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
"adaptationPrimitiveTypes" -> {
val objFound = findAdaptationPrimitiveTypesByID(queryID)
if(subquery != "" && objFound != null){
throw Exception("KMFQL : rejected sucessor")
} else {objFound}
}
else -> {}
}
}
}
