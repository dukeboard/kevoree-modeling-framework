package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DictionaryValue : org.kevoree.container.KMFContainer {
fun getValue() : String

fun setValue(value : String) 

fun getAttribute() : org.kevoree.DictionaryAttribute?

fun setAttribute(attribute : org.kevoree.DictionaryAttribute? )


fun getTargetNode() : org.kevoree.ContainerNode?

fun setTargetNode(targetNode : org.kevoree.ContainerNode? )

}
