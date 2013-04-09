package org.kevoree

/**
 * Created by Kevoree Model Generator(KMF).
 * @developers: Gregory Nain, Fouquet Francois
 * Date: 09 avr. 13 Time: 18:19
 * Meta-Model:NS_URI=http://kevoree/1.0
 */
trait Dictionary : org.kevoree.container.KMFContainer {

fun getValues() : List<org.kevoree.DictionaryValue>

fun setValues(values : List<org.kevoree.DictionaryValue> )


fun addValues(values : org.kevoree.DictionaryValue)


fun addAllValues(values :List<org.kevoree.DictionaryValue>)


fun removeValues(values : org.kevoree.DictionaryValue)

fun removeAllValues()

}
