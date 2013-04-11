package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NodeNetwork : org.kevoree.container.KMFContainer {

fun getLink() : List<org.kevoree.NodeLink>

fun setLink(link : List<org.kevoree.NodeLink> )


fun addLink(link : org.kevoree.NodeLink)


fun addAllLink(link :List<org.kevoree.NodeLink>)


fun removeLink(link : org.kevoree.NodeLink)

fun removeAllLink()


fun getInitBy() : org.kevoree.ContainerNode?

fun setInitBy(initBy : org.kevoree.ContainerNode? )


fun getTarget() : org.kevoree.ContainerNode?

fun setTarget(target : org.kevoree.ContainerNode? )

}
