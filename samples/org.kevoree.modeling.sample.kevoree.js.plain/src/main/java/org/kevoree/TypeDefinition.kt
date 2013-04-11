package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait TypeDefinition : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {
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

fun getDictionaryType() : org.kevoree.DictionaryType?

fun setDictionaryType(dictionaryType : org.kevoree.DictionaryType? )


fun getSuperTypes() : List<org.kevoree.TypeDefinition>

fun setSuperTypes(superTypes : List<org.kevoree.TypeDefinition> )


fun addSuperTypes(superTypes : org.kevoree.TypeDefinition)


fun addAllSuperTypes(superTypes :List<org.kevoree.TypeDefinition>)


fun removeSuperTypes(superTypes : org.kevoree.TypeDefinition)

fun removeAllSuperTypes()

fun findSuperTypesByID(key : String) : org.kevoree.TypeDefinition?
}
