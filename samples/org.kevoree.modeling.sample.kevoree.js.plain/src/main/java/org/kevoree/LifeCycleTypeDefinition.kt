package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait LifeCycleTypeDefinition : org.kevoree.container.KMFContainer , org.kevoree.TypeDefinition {
fun getStartMethod() : String

fun setStartMethod(startMethod : String) 
fun getStopMethod() : String

fun setStopMethod(stopMethod : String) 
fun getUpdateMethod() : String

fun setUpdateMethod(updateMethod : String) 
}
