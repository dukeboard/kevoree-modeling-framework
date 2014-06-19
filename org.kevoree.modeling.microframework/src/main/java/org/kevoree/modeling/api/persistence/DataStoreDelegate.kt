package org.kevoree.modeling.api.persistence

import java.util.HashSet

/**
 * Created by duke on 6/19/14.
 */

class DataStoreDelegate(val parent: DataStore, val local: DataStore) : DataStore {

    override fun get(segment: String, key: String): String? {
        var result = local.get(segment,key)
        if(result == null){
            result = parent.get(segment,key)
        }
        return result
    }
    override fun remove(segment: String, key: String) {
        local.remove(segment,key)
    }
    override fun sync() {
        local.sync()
    }
    override fun getSegments(): Set<String> {
        val concat = HashSet<String>()
        concat.addAll(local.getSegments())
        concat.addAll(parent.getSegments())
        return concat
    }
    override fun getSegmentKeys(segment: String): Set<String> {
        val concat = HashSet<String>()
        concat.addAll(parent.getSegmentKeys(segment))
        concat.addAll(local.getSegmentKeys(segment))
        return concat
    }

    override fun put(segment: String, key: String, value: String) {
        local.put(segment, key, value)
    }


}