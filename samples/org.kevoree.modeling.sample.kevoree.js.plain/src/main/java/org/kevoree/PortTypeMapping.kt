package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait PortTypeMapping : org.kevoree.container.KMFContainer {
fun getBeanMethodName() : String

fun setBeanMethodName(beanMethodName : String) 
fun getServiceMethodName() : String

fun setServiceMethodName(serviceMethodName : String) 
}
