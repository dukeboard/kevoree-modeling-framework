package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NodeType : org.kevoree.container.KMFContainer , org.kevoree.LifeCycleTypeDefinition {

fun getManagedPrimitiveTypes() : List<org.kevoree.AdaptationPrimitiveType>

fun setManagedPrimitiveTypes(managedPrimitiveTypes : List<org.kevoree.AdaptationPrimitiveType> )


fun addManagedPrimitiveTypes(managedPrimitiveTypes : org.kevoree.AdaptationPrimitiveType)


fun addAllManagedPrimitiveTypes(managedPrimitiveTypes :List<org.kevoree.AdaptationPrimitiveType>)


fun removeManagedPrimitiveTypes(managedPrimitiveTypes : org.kevoree.AdaptationPrimitiveType)

fun removeAllManagedPrimitiveTypes()

fun findManagedPrimitiveTypesByID(key : String) : org.kevoree.AdaptationPrimitiveType?
}
