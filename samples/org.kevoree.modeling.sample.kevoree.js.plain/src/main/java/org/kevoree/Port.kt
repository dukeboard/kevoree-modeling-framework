package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Port : org.kevoree.container.KMFContainer {

fun getPortTypeRef() : org.kevoree.PortTypeRef?

fun setPortTypeRef(portTypeRef : org.kevoree.PortTypeRef? )

}
