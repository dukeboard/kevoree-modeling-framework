package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait ComponentInstance : org.kevoree.container.KMFContainer , org.kevoree.NamedElement , org.kevoree.Instance {

fun getProvided() : List<org.kevoree.Port>

fun setProvided(provided : List<org.kevoree.Port> )


fun addProvided(provided : org.kevoree.Port)


fun addAllProvided(provided :List<org.kevoree.Port>)


fun removeProvided(provided : org.kevoree.Port)

fun removeAllProvided()


fun getRequired() : List<org.kevoree.Port>

fun setRequired(required : List<org.kevoree.Port> )


fun addRequired(required : org.kevoree.Port)


fun addAllRequired(required :List<org.kevoree.Port>)


fun removeRequired(required : org.kevoree.Port)

fun removeAllRequired()


fun getNamespace() : org.kevoree.Namespace?

fun setNamespace(namespace : org.kevoree.Namespace? )

}
