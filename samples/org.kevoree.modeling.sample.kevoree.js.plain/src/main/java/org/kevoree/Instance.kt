package org.kevoree;

trait t2 : t {
}
trait t {
}





trait KevoreeContainer {

}

trait NamedElement : org.kevoree.KevoreeContainer {
fun getName() : String
fun setName(name : String) 
}

trait Instance : org.kevoree.KevoreeContainer , org.kevoree.NamedElement {

}

trait Namespace : org.kevoree.KevoreeContainer , org.kevoree.NamedElement {

}

trait ComponentInstance : org.kevoree.KevoreeContainer , org.kevoree.NamedElement , org.kevoree.Instance {

fun getNamespace() : org.kevoree.Namespace?

fun setNamespace(namespace : org.kevoree.Namespace? )

}

trait ContainerNode : org.kevoree.KevoreeContainer , org.kevoree.NamedElement , org.kevoree.Instance {

fun getComponents() : List<org.kevoree.ComponentInstance>
fun setComponents(components : List<org.kevoree.ComponentInstance> )
fun addComponents(components : org.kevoree.ComponentInstance)
fun addAllComponents(components :List<org.kevoree.ComponentInstance>)
fun removeComponents(components : org.kevoree.ComponentInstance)
fun removeAllComponents()
fun findComponentsByID(key : String) : org.kevoree.ComponentInstance?
fun getHosts() : List<org.kevoree.ContainerNode>
fun setHosts(hosts : List<org.kevoree.ContainerNode> )
fun addHosts(hosts : org.kevoree.ContainerNode)
fun addAllHosts(hosts :List<org.kevoree.ContainerNode>)
fun removeHosts(hosts : org.kevoree.ContainerNode)
fun removeAllHosts()
fun findHostsByID(key : String) : org.kevoree.ContainerNode?

}

trait DeployUnit : org.kevoree.KevoreeContainer , org.kevoree.NamedElement {

}

trait TypedElement : org.kevoree.KevoreeContainer , org.kevoree.NamedElement {

fun getGenericTypes() : List<org.kevoree.TypedElement>

fun setGenericTypes(genericTypes : List<org.kevoree.TypedElement> )


fun addGenericTypes(genericTypes : org.kevoree.TypedElement)


fun addAllGenericTypes(genericTypes :List<org.kevoree.TypedElement>)


fun removeGenericTypes(genericTypes : org.kevoree.TypedElement)

fun removeAllGenericTypes()

fun findGenericTypesByID(key : String) : org.kevoree.TypedElement?
}



trait TypeDefinition : org.kevoree.KevoreeContainer , org.kevoree.NamedElement {
fun getFactoryBean() : String

fun setFactoryBean(factoryBean : String) 
fun getBean() : String

fun setBean(bean : String) 

fun getDeployUnits() : List<org.kevoree.DeployUnit>

fun setDeployUnits(deployUnits : List<org.kevoree.DeployUnit> )


fun addDeployUnits(deployUnits : org.kevoree.DeployUnit)


fun addAllDeployUnits(deployUnits :List<org.kevoree.DeployUnit>)


fun removeDeployUnits(deployUnits : org.kevoree.DeployUnit)

fun removeAllDeployUnits()

fun findDeployUnitsByID(key : String) : org.kevoree.DeployUnit?


fun getSuperTypes() : List<org.kevoree.TypeDefinition>

fun setSuperTypes(superTypes : List<org.kevoree.TypeDefinition> )


fun addSuperTypes(superTypes : org.kevoree.TypeDefinition)


fun addAllSuperTypes(superTypes :List<org.kevoree.TypeDefinition>)


fun removeSuperTypes(superTypes : org.kevoree.TypeDefinition)

fun removeAllSuperTypes()

fun findSuperTypesByID(key : String) : org.kevoree.TypeDefinition?
}


trait LifeCycleTypeDefinition : org.kevoree.KevoreeContainer , org.kevoree.TypeDefinition {
fun getStartMethod() : String

fun setStartMethod(startMethod : String) 
fun getStopMethod() : String

fun setStopMethod(stopMethod : String) 
fun getUpdateMethod() : String

fun setUpdateMethod(updateMethod : String) 
}

trait NodeType : org.kevoree.KevoreeContainer , org.kevoree.LifeCycleTypeDefinition {

}




