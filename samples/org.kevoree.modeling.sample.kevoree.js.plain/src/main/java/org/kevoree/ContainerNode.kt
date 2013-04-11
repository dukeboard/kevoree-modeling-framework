package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ContainerNode : org.kevoree.container.KMFContainer , org.kevoree.NamedElement , org.kevoree.Instance {

fun getComponents() : List<org.kevoree.ComponentInstance>

fun setComponents(components : List<org.kevoree.ComponentInstance> )


fun addComponents(components : org.kevoree.ComponentInstance)


fun addAllComponents(components :List<org.kevoree.ComponentInstance>)


fun removeComponents(components : org.kevoree.ComponentInstance)

fun removeAllComponents()

fun findComponentsByID(key : String) : org.kevoree.ComponentInstance?

fun getHosts() : List<org.kevoree.ContainerNode>

fun setHosts(hosts : List<org.kevoree.ContainerNode> )


fun addHosts(hosts : org.kevoree.ContainerNode)


fun addAllHosts(hosts :List<org.kevoree.ContainerNode>)


fun removeHosts(hosts : org.kevoree.ContainerNode)

fun removeAllHosts()

fun findHostsByID(key : String) : org.kevoree.ContainerNode?
}
