package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ContainerRoot : org.kevoree.container.KMFContainer {

fun getNodes() : List<org.kevoree.ContainerNode>

fun setNodes(nodes : List<org.kevoree.ContainerNode> )


fun addNodes(nodes : org.kevoree.ContainerNode)


fun addAllNodes(nodes :List<org.kevoree.ContainerNode>)


fun removeNodes(nodes : org.kevoree.ContainerNode)

fun removeAllNodes()

fun findNodesByID(key : String) : org.kevoree.ContainerNode?

fun getTypeDefinitions() : List<org.kevoree.TypeDefinition>

fun setTypeDefinitions(typeDefinitions : List<org.kevoree.TypeDefinition> )


fun addTypeDefinitions(typeDefinitions : org.kevoree.TypeDefinition)


fun addAllTypeDefinitions(typeDefinitions :List<org.kevoree.TypeDefinition>)


fun removeTypeDefinitions(typeDefinitions : org.kevoree.TypeDefinition)

fun removeAllTypeDefinitions()

fun findTypeDefinitionsByID(key : String) : org.kevoree.TypeDefinition?

fun getRepositories() : List<org.kevoree.Repository>

fun setRepositories(repositories : List<org.kevoree.Repository> )


fun addRepositories(repositories : org.kevoree.Repository)


fun addAllRepositories(repositories :List<org.kevoree.Repository>)


fun removeRepositories(repositories : org.kevoree.Repository)

fun removeAllRepositories()

fun findRepositoriesByID(key : String) : org.kevoree.Repository?

fun getDataTypes() : List<org.kevoree.TypedElement>

fun setDataTypes(dataTypes : List<org.kevoree.TypedElement> )


fun addDataTypes(dataTypes : org.kevoree.TypedElement)


fun addAllDataTypes(dataTypes :List<org.kevoree.TypedElement>)


fun removeDataTypes(dataTypes : org.kevoree.TypedElement)

fun removeAllDataTypes()

fun findDataTypesByID(key : String) : org.kevoree.TypedElement?

fun getLibraries() : List<org.kevoree.TypeLibrary>

fun setLibraries(libraries : List<org.kevoree.TypeLibrary> )


fun addLibraries(libraries : org.kevoree.TypeLibrary)


fun addAllLibraries(libraries :List<org.kevoree.TypeLibrary>)


fun removeLibraries(libraries : org.kevoree.TypeLibrary)

fun removeAllLibraries()

fun findLibrariesByID(key : String) : org.kevoree.TypeLibrary?

fun getHubs() : List<org.kevoree.Channel>

fun setHubs(hubs : List<org.kevoree.Channel> )


fun addHubs(hubs : org.kevoree.Channel)


fun addAllHubs(hubs :List<org.kevoree.Channel>)


fun removeHubs(hubs : org.kevoree.Channel)

fun removeAllHubs()

fun findHubsByID(key : String) : org.kevoree.Channel?

fun getMBindings() : List<org.kevoree.MBinding>

fun setMBindings(mBindings : List<org.kevoree.MBinding> )


fun addMBindings(mBindings : org.kevoree.MBinding)


fun addAllMBindings(mBindings :List<org.kevoree.MBinding>)


fun removeMBindings(mBindings : org.kevoree.MBinding)

fun removeAllMBindings()


fun getDeployUnits() : List<org.kevoree.DeployUnit>

fun setDeployUnits(deployUnits : List<org.kevoree.DeployUnit> )


fun addDeployUnits(deployUnits : org.kevoree.DeployUnit)


fun addAllDeployUnits(deployUnits :List<org.kevoree.DeployUnit>)


fun removeDeployUnits(deployUnits : org.kevoree.DeployUnit)

fun removeAllDeployUnits()

fun findDeployUnitsByID(key : String) : org.kevoree.DeployUnit?

fun getNodeNetworks() : List<org.kevoree.NodeNetwork>

fun setNodeNetworks(nodeNetworks : List<org.kevoree.NodeNetwork> )


fun addNodeNetworks(nodeNetworks : org.kevoree.NodeNetwork)


fun addAllNodeNetworks(nodeNetworks :List<org.kevoree.NodeNetwork>)


fun removeNodeNetworks(nodeNetworks : org.kevoree.NodeNetwork)

fun removeAllNodeNetworks()


fun getGroups() : List<org.kevoree.Group>

fun setGroups(groups : List<org.kevoree.Group> )


fun addGroups(groups : org.kevoree.Group)


fun addAllGroups(groups :List<org.kevoree.Group>)


fun removeGroups(groups : org.kevoree.Group)

fun removeAllGroups()

fun findGroupsByID(key : String) : org.kevoree.Group?

fun getGroupTypes() : List<org.kevoree.GroupType>

fun setGroupTypes(groupTypes : List<org.kevoree.GroupType> )


fun addGroupTypes(groupTypes : org.kevoree.GroupType)


fun addAllGroupTypes(groupTypes :List<org.kevoree.GroupType>)


fun removeGroupTypes(groupTypes : org.kevoree.GroupType)

fun removeAllGroupTypes()

fun findGroupTypesByID(key : String) : org.kevoree.GroupType?

fun getAdaptationPrimitiveTypes() : List<org.kevoree.AdaptationPrimitiveType>

fun setAdaptationPrimitiveTypes(adaptationPrimitiveTypes : List<org.kevoree.AdaptationPrimitiveType> )


fun addAdaptationPrimitiveTypes(adaptationPrimitiveTypes : org.kevoree.AdaptationPrimitiveType)


fun addAllAdaptationPrimitiveTypes(adaptationPrimitiveTypes :List<org.kevoree.AdaptationPrimitiveType>)


fun removeAdaptationPrimitiveTypes(adaptationPrimitiveTypes : org.kevoree.AdaptationPrimitiveType)

fun removeAllAdaptationPrimitiveTypes()

fun findAdaptationPrimitiveTypesByID(key : String) : org.kevoree.AdaptationPrimitiveType?
}
