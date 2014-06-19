package org.kevoree.modeling.api.persistence

/**
 * Created by duke on 6/19/14.
 */

class DataStoreDelegate(val proxy: DataStore, val real: DataStore) : DataStore {

    override fun get(segment: String, key: String): String? {
        throw UnsupportedOperationException()
    }
    override fun remove(segment: String, key: String) {
        throw UnsupportedOperationException()
    }
    override fun sync() {
        real.sync()
    }
    override fun getSegments(): Set<String> {
        throw UnsupportedOperationException()
    }
    override fun getSegmentKeys(segment: String): Set<String> {
        throw UnsupportedOperationException()
    }

    override fun put(segment: String, key: String, value: String) {
        real.put(segment, key, value)
    }


}