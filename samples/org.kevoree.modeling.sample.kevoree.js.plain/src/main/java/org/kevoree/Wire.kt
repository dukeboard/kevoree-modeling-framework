package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Wire : org.kevoree.container.KMFContainer {

fun getPorts() : List<org.kevoree.PortTypeRef>

fun setPorts(ports : List<org.kevoree.PortTypeRef> )


fun addPorts(ports : org.kevoree.PortTypeRef)


fun addAllPorts(ports :List<org.kevoree.PortTypeRef>)


fun removePorts(ports : org.kevoree.PortTypeRef)

fun removeAllPorts()

fun findPortsByID(key : String) : org.kevoree.PortTypeRef?
}
