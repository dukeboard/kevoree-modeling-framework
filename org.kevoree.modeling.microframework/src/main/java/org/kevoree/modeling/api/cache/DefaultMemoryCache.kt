package org.kevoree.modeling.api.cache

import org.kevoree.modeling.api.DataCache
import java.util.HashMap
import org.kevoree.modeling.api.KObject

/**
 * Created by duke on 10/2/14.
 */

class DefaultMemoryCache : DataCache {

    val obj_cache = HashMap<String, KObject<*>>()

    val payload_cache = HashMap<String, Array<Any?>>()

    override fun put(key: String, value: KObject<Any?>, indexSize: Int) {
        obj_cache.put(key, value)
        payload_cache.put(key, Array<Any?>(indexSize) {})
    }
    override fun get(key: String): KObject<Any?>? {
        return obj_cache.get(key)
    }
    override fun get(key: String, index: Int): Any? {
        var previousArray = payload_cache.get(key);
        if (previousArray == null) {
            throw Exception("Inconsistancy error, bad allocation")
        }
        return previousArray!!.get(index)
    }
    override fun put(key: String, index: Int, payload: Any) {
        var previousArray = payload_cache.get(key);
        if (previousArray == null) {
            throw Exception("Inconsistancy error, bad allocation")
        }
        previousArray!!.set(index, payload)
    }

}