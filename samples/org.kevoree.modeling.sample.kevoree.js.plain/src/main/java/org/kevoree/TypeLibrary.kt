package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait TypeLibrary : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {

fun getSubTypes() : List<org.kevoree.TypeDefinition>

fun setSubTypes(subTypes : List<org.kevoree.TypeDefinition> )


fun addSubTypes(subTypes : org.kevoree.TypeDefinition)


fun addAllSubTypes(subTypes :List<org.kevoree.TypeDefinition>)


fun removeSubTypes(subTypes : org.kevoree.TypeDefinition)

fun removeAllSubTypes()

fun findSubTypesByID(key : String) : org.kevoree.TypeDefinition?
}
