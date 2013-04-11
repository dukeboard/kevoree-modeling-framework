package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NetworkProperty : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {
fun getValue() : String

fun setValue(value : String) 
fun getLastCheck() : String

fun setLastCheck(lastCheck : String) 
}
