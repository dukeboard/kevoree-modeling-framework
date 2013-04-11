package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait NodeLink : org.kevoree.container.KMFContainer {
fun getNetworkType() : String

fun setNetworkType(networkType : String) 
fun getEstimatedRate() : Int

fun setEstimatedRate(estimatedRate : Int) 
fun getLastCheck() : String

fun setLastCheck(lastCheck : String) 

fun getNetworkProperties() : List<org.kevoree.NetworkProperty>

fun setNetworkProperties(networkProperties : List<org.kevoree.NetworkProperty> )


fun addNetworkProperties(networkProperties : org.kevoree.NetworkProperty)


fun addAllNetworkProperties(networkProperties :List<org.kevoree.NetworkProperty>)


fun removeNetworkProperties(networkProperties : org.kevoree.NetworkProperty)

fun removeAllNetworkProperties()

fun findNetworkPropertiesByID(key : String) : org.kevoree.NetworkProperty?
}
