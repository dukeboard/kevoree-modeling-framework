package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait MessagePortType : org.kevoree.container.KMFContainer , org.kevoree.PortType {

fun getFilters() : List<org.kevoree.TypedElement>

fun setFilters(filters : List<org.kevoree.TypedElement> )


fun addFilters(filters : org.kevoree.TypedElement)


fun addAllFilters(filters :List<org.kevoree.TypedElement>)


fun removeFilters(filters : org.kevoree.TypedElement)

fun removeAllFilters()

fun findFiltersByID(key : String) : org.kevoree.TypedElement?
}
