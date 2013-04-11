package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ExtraFonctionalProperty : org.kevoree.container.KMFContainer {

fun getPortTypes() : List<org.kevoree.PortTypeRef>

fun setPortTypes(portTypes : List<org.kevoree.PortTypeRef> )


fun addPortTypes(portTypes : org.kevoree.PortTypeRef)


fun addAllPortTypes(portTypes :List<org.kevoree.PortTypeRef>)


fun removePortTypes(portTypes : org.kevoree.PortTypeRef)

fun removeAllPortTypes()

fun findPortTypesByID(key : String) : org.kevoree.PortTypeRef?
}
