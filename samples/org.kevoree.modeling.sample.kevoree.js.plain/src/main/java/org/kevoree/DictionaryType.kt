package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 10 avr. 13 Time: 18:33
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait DictionaryType : org.kevoree.container.KMFContainer {

fun getAttributes() : List<org.kevoree.DictionaryAttribute>

fun setAttributes(attributes : List<org.kevoree.DictionaryAttribute> )


fun addAttributes(attributes : org.kevoree.DictionaryAttribute)


fun addAllAttributes(attributes :List<org.kevoree.DictionaryAttribute>)


fun removeAttributes(attributes : org.kevoree.DictionaryAttribute)

fun removeAllAttributes()

fun findAttributesByID(key : String) : org.kevoree.DictionaryAttribute?

fun getDefaultValues() : List<org.kevoree.DictionaryValue>

fun setDefaultValues(defaultValues : List<org.kevoree.DictionaryValue> )


fun addDefaultValues(defaultValues : org.kevoree.DictionaryValue)


fun addAllDefaultValues(defaultValues :List<org.kevoree.DictionaryValue>)


fun removeDefaultValues(defaultValues : org.kevoree.DictionaryValue)

fun removeAllDefaultValues()

}
