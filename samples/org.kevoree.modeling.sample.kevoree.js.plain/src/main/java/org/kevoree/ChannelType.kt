package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ChannelType : org.kevoree.container.KMFContainer , org.kevoree.LifeCycleTypeDefinition {
fun getLowerBindings() : Int

fun setLowerBindings(lowerBindings : Int) 
fun getUpperBindings() : Int

fun setUpperBindings(upperBindings : Int) 
fun getLowerFragments() : Int

fun setLowerFragments(lowerFragments : Int) 
fun getUpperFragments() : Int

fun setUpperFragments(upperFragments : Int) 
}
