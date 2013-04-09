package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Operation : org.kevoree.container.KMFContainer , org.kevoree.NamedElement {

fun getParameters() : List<org.kevoree.Parameter>

fun setParameters(parameters : List<org.kevoree.Parameter> )


fun addParameters(parameters : org.kevoree.Parameter)


fun addAllParameters(parameters :List<org.kevoree.Parameter>)


fun removeParameters(parameters : org.kevoree.Parameter)

fun removeAllParameters()

fun findParametersByID(key : String) : org.kevoree.Parameter?

fun getReturnType() : org.kevoree.TypedElement?

fun setReturnType(returnType : org.kevoree.TypedElement? )

}
