package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait TypedElement : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {

fun getGenericTypes() : List<org.kevoree.TypedElement>

fun setGenericTypes(genericTypes : List<org.kevoree.TypedElement> )


fun addGenericTypes(genericTypes : org.kevoree.TypedElement)


fun addAllGenericTypes(genericTypes :List<org.kevoree.TypedElement>)


fun removeGenericTypes(genericTypes : org.kevoree.TypedElement)

fun removeAllGenericTypes()

fun findGenericTypesByID(key : String) : org.kevoree.TypedElement?
}
