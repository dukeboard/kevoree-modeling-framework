package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Namespace : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {

fun getChilds() : List<org.kevoree.Namespace>

fun setChilds(childs : List<org.kevoree.Namespace> )


fun addChilds(childs : org.kevoree.Namespace)


fun addAllChilds(childs :List<org.kevoree.Namespace>)


fun removeChilds(childs : org.kevoree.Namespace)

fun removeAllChilds()

fun findChildsByID(key : String) : org.kevoree.Namespace?

fun getParent() : org.kevoree.Namespace?

fun setParent(parent : org.kevoree.Namespace? )

}
