package org.kevoree.modeling.api;

trait KMFContainer {

    fun setRecursiveReadOnly(): Unit
    fun eContainer(): KMFContainer?
    fun isReadOnly(): Boolean
    fun isRecursiveReadOnly(): Boolean
    fun setInternalReadOnly()
    fun delete()
    fun modelEquals(similarObj: Any?): Boolean
    fun deepModelEquals(similarObj: Any?): Boolean
    fun getRefInParent(): String?
    fun findByPath(query: String): Any?
    fun path(): String?
    fun metaClassName(): String
    fun reflexiveMutator(mutatorType: Int, refName: String, value: Any?)
    fun containedElementsList(): List<Any>

}