package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait CompositeType : org.kevoree.container.KMFContainer , org.kevoree.ComponentType {

fun getChilds() : List<org.kevoree.ComponentType>

fun setChilds(childs : List<org.kevoree.ComponentType> )


fun addChilds(childs : org.kevoree.ComponentType)


fun addAllChilds(childs :List<org.kevoree.ComponentType>)


fun removeChilds(childs : org.kevoree.ComponentType)

fun removeAllChilds()

fun findChildsByID(key : String) : org.kevoree.ComponentType?

fun getWires() : List<org.kevoree.Wire>

fun setWires(wires : List<org.kevoree.Wire> )


fun addWires(wires : org.kevoree.Wire)


fun addAllWires(wires :List<org.kevoree.Wire>)


fun removeWires(wires : org.kevoree.Wire)

fun removeAllWires()

}
