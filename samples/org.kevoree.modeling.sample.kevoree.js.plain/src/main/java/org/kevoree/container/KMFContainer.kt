





package org.kevoree.container;

trait KMFContainer {

fun setRecursiveReadOnly() : Unit
fun eContainer() : KMFContainer?
fun isReadOnly() : Boolean
fun isRecursiveReadOnly() : Boolean
fun setInternalReadOnly()
fun delete()



fun findByPath(query : String) : Any?
fun path() : String?

    fun getClonelazy(subResult : java.util.HashMap<Any,Any>, _factories : org.kevoree.factory.MainFactory, mutableOnly: Boolean)
    fun resolve(addrs : java.util.HashMap<Any,Any>,readOnly:Boolean, mutableOnly: Boolean) : Any

}