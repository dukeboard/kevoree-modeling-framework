package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Repository : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {
fun getUrl() : String

fun setUrl(url : String) 

fun getUnits() : List<org.kevoree.DeployUnit>

fun setUnits(units : List<org.kevoree.DeployUnit> )


fun addUnits(units : org.kevoree.DeployUnit)


fun addAllUnits(units :List<org.kevoree.DeployUnit>)


fun removeUnits(units : org.kevoree.DeployUnit)

fun removeAllUnits()

fun findUnitsByID(key : String) : org.kevoree.DeployUnit?
}
