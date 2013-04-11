package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Group : org.kevoree.container.KMFContainer , org.kevoree.Instance {

fun getSubNodes() : List<org.kevoree.ContainerNode>

fun setSubNodes(subNodes : List<org.kevoree.ContainerNode> )


fun addSubNodes(subNodes : org.kevoree.ContainerNode)


fun addAllSubNodes(subNodes :List<org.kevoree.ContainerNode>)


fun removeSubNodes(subNodes : org.kevoree.ContainerNode)

fun removeAllSubNodes()

fun findSubNodesByID(key : String) : org.kevoree.ContainerNode?
}
