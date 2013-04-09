package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait PortTypeRef : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {
fun getOptional() : Boolean

fun setOptional(optional : Boolean) 
fun getNoDependency() : Boolean

fun setNoDependency(noDependency : Boolean) 

fun getRef() : org.kevoree.PortType?

fun setRef(ref : org.kevoree.PortType? )


fun getMappings() : List<org.kevoree.PortTypeMapping>

fun setMappings(mappings : List<org.kevoree.PortTypeMapping> )


fun addMappings(mappings : org.kevoree.PortTypeMapping)


fun addAllMappings(mappings :List<org.kevoree.PortTypeMapping>)


fun removeMappings(mappings : org.kevoree.PortTypeMapping)

fun removeAllMappings()

}
