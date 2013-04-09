package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Instance : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {
fun getMetaData() : String

fun setMetaData(metaData : String) 

fun getTypeDefinition() : org.kevoree.TypeDefinition?

fun setTypeDefinition(typeDefinition : org.kevoree.TypeDefinition? )


fun getDictionary() : org.kevoree.Dictionary?

fun setDictionary(dictionary : org.kevoree.Dictionary? )

}
