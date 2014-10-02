package org.kevoree.modeling.api

public trait DataCache {
    //object cache
    fun put(key: String, value: KObject<*>, indexSize: Int)
    fun get(key: String): KObject<*>?
    //payload cache
    fun get(key: String, index: Int): Any?
    fun put(key: String, index: Int, payload: Any)

}