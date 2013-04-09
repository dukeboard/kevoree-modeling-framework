package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait MBinding : org.kevoree.container.KMFContainer {

fun getPort() : org.kevoree.Port?

fun setPort(port : org.kevoree.Port? )


fun getHub() : org.kevoree.Channel?

fun setHub(hub : org.kevoree.Channel? )

}
