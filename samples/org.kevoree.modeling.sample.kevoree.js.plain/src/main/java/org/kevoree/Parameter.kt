package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Parameter : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {

fun getType() : org.kevoree.TypedElement?

fun setType(`type` : org.kevoree.TypedElement? )

}
