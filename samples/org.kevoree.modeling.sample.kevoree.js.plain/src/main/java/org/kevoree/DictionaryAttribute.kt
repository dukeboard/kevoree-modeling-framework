package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DictionaryAttribute : org.kevoree.container.KMFContainer , org.kevoree.TypedElement {
fun getOptional() : Boolean

fun setOptional(optional : Boolean) 
fun getState() : Boolean

fun setState(state : Boolean) 
fun getDatatype() : String

fun setDatatype(datatype : String) 
fun getFragmentDependant() : Boolean

fun setFragmentDependant(fragmentDependant : Boolean) 
}
